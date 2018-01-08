package com.opensource.xtmem

import android.os.Handler
import java.lang.ref.WeakReference
import java.util.*

/**
 * Created by cuiminghui on 2018/1/8.
 */

private val sharedHandler = Handler()

class XTManagedObject(obj: Any) {

    val objectUUID = UUID.randomUUID().toString()
    var objectThreadSafe = false
    var objectThread = Thread.currentThread()
    var weakRef: WeakReference<Any> = WeakReference(obj)
    var strongRef: Any? = null

    init {
        sharedHandler.post { obj.toString() }
    }

    var xtRetainCount = 0
        set(value) {
            field = value
            strongRef = if (value > 0) {
                weakRef.get()
            } else {
                null
            }
        }

}