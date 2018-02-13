package com.opensource.xt.core

import android.os.Handler
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import java.lang.ref.WeakReference
import java.util.concurrent.ConcurrentHashMap

/**
 * Created by cuiminghui on 2018/1/8.
 */
class XTMemoryManager {

    class RetainClass(val runtime: WeakReference<V8>) {

        fun retain(objectUUID: String, ownerUUID: Object) {
            objectMapping[objectUUID]?.let {
                it.xtRetainCount++
                val owner = (ownerUUID as? String)?.let { return@let find(objectUUID) } ?: runtime.get()
                owner?.let { owner ->
                    it.owners = (it.owners?.toMutableList() ?: mutableListOf()).let { list ->
                        list.add(WeakReference(owner))
                        return@let list.toList()
                    }
                }
            }
        }

    }

    companion object {

        private var objectMapping: ConcurrentHashMap<String, XTManagedObject> = ConcurrentHashMap(2048)
        private var sharedHandler = Handler()

        fun attachContext(runtime: V8) {
            val retainClass = RetainClass(WeakReference(runtime))
            runtime.registerJavaMethod(retainClass, "retain", "_XTRetain", arrayOf(String::class.java, Object::class.java))
            runtime.registerJavaMethod(this, "release", "_XTRelease", arrayOf(String::class.java))
        }

        fun add(obj: XTManagedObject) {
            runGC()
            obj.xtRetainCount++
            sharedHandler.postDelayed({
                obj.xtRetainCount--
            }, 1000)
            objectMapping.put(obj.objectUUID, obj)
        }

        fun release(objectUUID: String) {
            objectMapping[objectUUID]?.let {
                it.xtRetainCount--
            }
        }

        fun find(objectUUID: String): Any? {
            return objectMapping[objectUUID]?.takeIf {
                return@takeIf !(!it.objectThreadSafe && it.objectThread != Thread.currentThread())
            }?.weakRef?.get()
        }

        private var syncToken: Int = 0

        private fun runGC(force: Boolean = false) {
            if (System.nanoTime() % 100 < 2 || force) {
                synchronized(syncToken, {
                    val removingKeys = objectMapping.values.mapNotNull {
                        if (it.weakRef.get() == null) {
                            return@mapNotNull it.objectUUID
                        }
                        else if (it.owners?.count() ?: 0 > 0 &&
                                it.owners?.filter { it.get() == null }?.size == 0) {
                            return@mapNotNull it.objectUUID
                        }
                        else {
                            return@mapNotNull null
                        }
                    }
                    removingKeys.forEach {
                        objectMapping.remove(it)
                    }
                })
            }
        }

    }

}