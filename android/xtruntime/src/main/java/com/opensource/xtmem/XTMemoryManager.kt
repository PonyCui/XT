package com.opensource.xtmem

import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object

/**
 * Created by cuiminghui on 2018/1/8.
 */
class XTMemoryManager {

    companion object {

        private var objectMapping: Map<String, XTManagedObject> = mapOf()

        fun attachContext(runtime: V8) {
            val exports = V8Object(runtime)
            exports.registerJavaMethod(this, "retain", "retain", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "release", "release", arrayOf(String::class.java))
            runtime.add("XTMemoryManager", exports)
        }

        fun add(obj: XTManagedObject) {
            runGC()
            objectMapping.toMutableMap()?.let {
                it.put(obj.objectUUID, obj)
                objectMapping = it.toMap()
            }
        }

        fun retain(objectUUID: String) {
            objectMapping[objectUUID]?.let {
                it.xtRetainCount++
            }
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

        private fun runGC() {
            if (System.nanoTime() % 10 < 2) {
                objectMapping = objectMapping.filter {
                    return@filter it.value.weakRef.get() != null
                }
            }
        }

    }

}