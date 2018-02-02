package com.opensource.xt.core

import android.os.Handler
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import java.util.concurrent.ConcurrentHashMap

/**
 * Created by cuiminghui on 2018/1/8.
 */
class XTMemoryManager {

    companion object {

        private var objectMapping: ConcurrentHashMap<String, XTManagedObject> = ConcurrentHashMap(2048)
        private var sharedHandler = Handler()

        fun attachContext(runtime: V8) {
            runtime.registerJavaMethod(this, "retain", "_XTRetain", arrayOf(String::class.java))
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
            if (System.nanoTime() % 10 < 1) {
                val removingKeys = objectMapping.values.mapNotNull {
                    if (it.weakRef.get() == null) {
                        return@mapNotNull it.objectUUID
                    }
                    else {
                        return@mapNotNull null
                    }
                }
                removingKeys.forEach {
                    objectMapping.remove(it)
                }
            }
        }

    }

}