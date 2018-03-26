package com.opensource.xt.foundation

import android.content.Context
import android.database.Cursor.*
import android.database.sqlite.SQLiteDatabase
import android.os.Handler
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Function
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.utils.V8ObjectUtils
import com.opensource.xt.core.*
import java.io.File

/**
 * Created by cuiminghui on 2018/3/23.
 */
class XTFDatabase(val context: XTContext, name: String, location: String): XTComponentInstance {

    private class Queue(private val db: SQLiteDatabase) {

        private var lock = 0

        fun inDatabase(exec: (db: SQLiteDatabase) -> Unit) {
            Thread({
                synchronized(lock, {
                    exec(db)
                })
            }).start()
        }

        companion object {

            private val dbPool: MutableMap<String, Queue> = mutableMapOf()

            fun databaseQueueWithFile(file: File): Queue {
                file.parentFile.mkdirs()
                return dbPool[file.absolutePath] ?: kotlin.run {
                    val instance = Queue(SQLiteDatabase.openOrCreateDatabase(file.absolutePath, null))
                    dbPool[file.absolutePath] = instance
                    return@run instance
                }
            }

            fun destoryQueueWithFile(file: File) {
                file.parentFile.mkdirs()
                databaseQueueWithFile(file)?.db.close()
                dbPool.remove(file.absolutePath)
                SQLiteDatabase.deleteDatabase(file)
            }

        }

    }


    override var objectUUID: String? = null
    private val dbFile: File
    private var databaseQueue: Queue? = null
    internal var inTransaction = false
    private val transactionExecutions: MutableList<(db: SQLiteDatabase) -> Exception?> = mutableListOf()

    init {
        dbFile = when (location) {
            "cache" -> {
                val baseDir = context.appContext.cacheDir.absolutePath + "/Caches/xt_foundation_database"
                File("$baseDir/$name")
            }
            "tmp" -> {
                val baseDir = context.appContext.cacheDir.absolutePath + "/tmp/xt_foundation_database"
                File("$baseDir/$name")
            }
            else -> {
                val baseDir = context.appContext.getDir("Document", Context.MODE_PRIVATE).absolutePath + "/xt_foundation_database"
                File("$baseDir/$name")
            }
        }
    }

    fun open(): Exception? {
        return try {
            this.databaseQueue = Queue.databaseQueueWithFile(dbFile)
            null
        } catch (e: Exception) { e }
    }

    fun executeStatements(sql: String, resolver: V8Function, rejector: V8Function) {
        val databaseQueue = this.databaseQueue ?: return
        if (inTransaction) {
            transactionExecutions.add {
                return@add try {
                    it.execSQL(sql)
                    null
                } catch (e: Exception) { e }
            }
            return
        }
        val resolver = resolver.twin()
        val rejector = rejector.twin()
        val handler = Handler()
        databaseQueue.inDatabase {
            try {
                it.execSQL(sql)
                handler.post {
                    XTContext.callWithArgument(resolver)
                    XTContext.release(resolver, rejector)
                }
            } catch (e: Exception) {
                handler.post {
                    XTContext.callWithArgument(rejector, e.message)
                    XTContext.release(resolver, rejector)
                }
            }
        }
    }

    fun executeTransaction(rollback: Boolean, resolver: V8Function, rejector: V8Function) {
        val databaseQueue = this.databaseQueue ?: return
        val resolver = resolver.twin()
        val rejector = rejector.twin()
        val handler = Handler()
        databaseQueue.inDatabase {
            try {
                it.beginTransaction()
                transactionExecutions.forEach { transactionExecution ->
                    transactionExecution.invoke(it)?.let {
                        throw it
                    }
                }
                it.setTransactionSuccessful()
                it.endTransaction()
                clearTransaction()
                handler.post {
                    XTContext.callWithArgument(resolver)
                    XTContext.release(resolver, rejector)
                }
            } catch (e: Exception) {
                if (!rollback) {
                    it.setTransactionSuccessful()
                }
                it.endTransaction()
                clearTransaction()
                handler.post {
                    XTContext.callWithArgument(rejector, e.message)
                    XTContext.release(resolver, rejector)
                }
            }
        }
    }

    private fun clearTransaction() {
        inTransaction = false
        transactionExecutions.clear()
    }

    fun executeUpdate(sql: String, values: V8Array, resolver: V8Function, rejector: V8Function) {
        val databaseQueue = this.databaseQueue ?: return
        val values = V8ObjectUtils.toList(values).toTypedArray()
        if (inTransaction) {
            transactionExecutions.add {
                return@add try {
                    it.execSQL(sql, values)
                    null
                } catch (e: Exception) { e }
            }
            return
        }
        val resolver = resolver.twin()
        val rejector = rejector.twin()
        val handler = Handler()
        databaseQueue.inDatabase {
            try {
                it.execSQL(sql, values)
                handler.post {
                    XTContext.callWithArgument(resolver)
                    XTContext.release(resolver, rejector)
                }
            } catch (e: Exception) {
                handler.post {
                    XTContext.callWithArgument(rejector, e.message)
                    XTContext.release(resolver, rejector)
                }
            }
        }
    }

    fun executeQuery(sql: String, values: V8Array, resolver: V8Function, rejector: V8Function) {
        val databaseQueue = this.databaseQueue ?: return
        if (inTransaction) {
            transactionExecutions.add {
                return@add Exception("Do not executeQuery while runing transaction.")
            }
            return
        }
        val values = V8ObjectUtils.toList(values).map { it as? String }.toTypedArray()
        val resolver = resolver.twin()
        val rejector = rejector.twin()
        val handler = Handler()
        databaseQueue.inDatabase {
            try {
                val cursor = it.rawQuery(sql, values)
                val results: MutableList<MutableMap<String, Any>> = mutableListOf()
                while (cursor.moveToNext()) {
                    var result: MutableMap<String, Any> = mutableMapOf()
                    cursor.columnNames.forEachIndexed { i, v ->
                        when (cursor.getType(i)) {
                            FIELD_TYPE_NULL -> { }
                            FIELD_TYPE_INTEGER -> {
                                result.put(v, cursor.getInt(i))
                            }
                            FIELD_TYPE_FLOAT -> {
                                result.put(v, cursor.getFloat(i))
                            }
                            FIELD_TYPE_STRING -> {
                                result.put(v, cursor.getString(i))
                            }
                        }
                    }
                    results.add(result)
                }
                handler.post {
                    val v8Results = V8ObjectUtils.toV8Array(context.runtime, results)
                    XTContext.callWithArgument(resolver, v8Results)
                    XTContext.release(resolver, rejector, v8Results)
                }
            } catch (e: Exception) {
                handler.post {
                    XTContext.callWithArgument(rejector, e.message)
                    XTContext.release(resolver, rejector)
                }
            }
        }
    }

    fun destory(): Exception? {
        return try {
            Queue.destoryQueueWithFile(dbFile)
            null
        } catch (e: Exception) { e }
    }

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTFDatabase"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_open", "xtr_open", arrayOf(V8Function::class.java, V8Function::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_executeStatements", "xtr_executeStatements", arrayOf(String::class.java, V8Function::class.java, V8Function::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_executeTransaction", "xtr_executeTransaction", arrayOf(V8Function::class.java, Boolean::class.java, V8Function::class.java, V8Function::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_executeUpdate", "xtr_executeUpdate", arrayOf(String::class.java, V8Array::class.java, V8Function::class.java, V8Function::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_executeQuery", "xtr_executeQuery", arrayOf(String::class.java, V8Array::class.java, V8Function::class.java, V8Function::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_destory", "xtr_destory", arrayOf(V8Function::class.java, V8Function::class.java, String::class.java))
            return exports
        }

        fun create(name: String, location: String): String {
            val database = XTFDatabase(context, name, location)
            val managedObject = XTManagedObject(database)
            database.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_open(resolver: V8Function, rejector: V8Function, objectRef: String) {
            val database = XTMemoryManager.find(objectRef) as? XTFDatabase ?: return
            database.open()?.let {
                XTContext.callWithArgument(rejector, it.message)
            } ?: kotlin.run {
                XTContext.callWithArgument(resolver)
            }
        }

        fun xtr_executeStatements(sql: String, resolver: V8Function, rejector: V8Function, objectRef: String) {
            val database = XTMemoryManager.find(objectRef) as? XTFDatabase ?: return
            database.executeStatements(sql, resolver, rejector)
        }

        fun xtr_executeTransaction(exec: V8Function, rollback: Boolean, resolver: V8Function, rejector: V8Function, objectRef: String) {
            val database = XTMemoryManager.find(objectRef) as? XTFDatabase ?: return
            if (database.inTransaction) {
                XTContext.callWithArgument(rejector, "Already inTransaction.")
                return
            }
            database.inTransaction = true
            XTContext.callWithArgument(exec)
            database.executeTransaction(rollback, resolver, rejector)
        }

        fun xtr_executeUpdate(sql: String, values: V8Array, resolver: V8Function, rejector: V8Function, objectRef: String) {
            val database = XTMemoryManager.find(objectRef) as? XTFDatabase ?: return
            database.executeUpdate(sql, values, resolver, rejector)
        }

        fun xtr_executeQuery(sql: String, values: V8Array, resolver: V8Function, rejector: V8Function, objectRef: String) {
            val database = XTMemoryManager.find(objectRef) as? XTFDatabase ?: return
            database.executeQuery(sql, values, resolver, rejector)
        }

        fun xtr_destory(resolver: V8Function, rejector: V8Function, objectRef: String) {
            val database = XTMemoryManager.find(objectRef) as? XTFDatabase ?: return
            database.destory()?.let {
                XTContext.callWithArgument(rejector, it.message)
            } ?: kotlin.run {
                XTContext.callWithArgument(resolver)
            }
        }

    }

}