//package com.opensource.xtruntime
//
//import com.eclipsesource.v8.V8
//import com.eclipsesource.v8.V8Object
//import com.eclipsesource.v8.V8Value
//
///**
// * Created by cuiminghui on 2017/9/8.
// */
//class XTRScrollView: XTRComponent() {
//
//    override val name: String = "XTRScrollView"
//
//    override fun v8Object(): V8Object? {
//        val v8Object = V8Object(xtrContext.runtime)
//        v8Object.registerJavaMethod(this, "createScriptObject", "createScriptObject", arrayOf(V8Object::class.java, V8Object::class.java))
//        return v8Object
//    }
//
//    fun createScriptObject(rect: V8Object, scriptObject: V8Object): V8Object {
//        val innerViewObject = scriptObject.get("innerView") as V8Object
//        val view = InnerObject(XTRUtils.toView(innerViewObject) as XTRView.InnerObject, xtrContext.autoRelease(scriptObject.twin()), xtrContext)
//        XTRUtils.toRect(rect)?.let {
//            view.frame = it
//        }
//        innerViewObject.release()
//        return view.requestV8Object(xtrContext.runtime)
//    }
//
//    class InnerObject(val innerView: XTRView.InnerObject, scriptObject: V8Object, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {
//
//        init {
//            this.xtr_setUserInteractionEnabled(true)
//            this.innerView.xtr_setUserInteractionEnabled(true)
//            this.xtr_addSubview(this.innerView)
//        }
//
//        override fun requestV8Object(runtime: V8): V8Object {
//            val v8Object = super<XTRView.InnerObject>.requestV8Object(runtime)
//            v8Object.registerJavaMethod(this, "xtr_contentOffset", "xtr_contentOffset", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setContentOffset", "xtr_setContentOffset", arrayOf(V8Object::class.java))
//            v8Object.registerJavaMethod(this, "xtr_setContentSize", "xtr_setContentSize", arrayOf(V8Object::class.java))
//            v8Object.registerJavaMethod(this, "xtr_setBounce", "xtr_setBounce", arrayOf(Boolean::class.java))
//            v8Object.registerJavaMethod(this, "xtr_setAlwaysBounceVertical", "xtr_setAlwaysBounceVertical", arrayOf(Boolean::class.java))
//            v8Object.registerJavaMethod(this, "xtr_setAlwaysBounceHorizontal", "xtr_setAlwaysBounceHorizontal", arrayOf(Boolean::class.java))
//            return v8Object
//        }
//
//        fun xtr_contentOffset(): V8Value {
//            return XTRUtils.fromObject(xtrContext, XTRPoint(
//                    (this.innerView.scrollX.toFloat() / resources.displayMetrics.density).toDouble(),
//                    (this.innerView.scrollY.toFloat() / resources.displayMetrics.density).toDouble()
//            )) as? V8Object ?: V8.getUndefined()
//        }
//
//        fun xtr_setContentOffset(value: V8Object) {
//            XTRUtils.toPoint(value)?.let {
//                this.innerView.scrollX = (it.x * resources.displayMetrics.density).toInt()
//                this.innerView.scrollY = (it.y * resources.displayMetrics.density).toInt()
//                this.innerView.requestLayout()
//            }
//        }
//
//        private var contentSize: XTRSize = XTRSize(0.0, 0.0)
//
//        fun xtr_setContentSize(value: V8Object) {
//            XTRUtils.toSize(value)?.let { contentSize = it }
//        }
//
//        private var bounce: Boolean = true
//
//        fun xtr_setBounce(value: Boolean) {
//            bounce = value
//        }
//
//        private var alwaysBounceVertical: Boolean = false
//
//        fun xtr_setAlwaysBounceVertical(value: Boolean) {
//            alwaysBounceVertical = value
//        }
//
//        private var alwaysBounceHorizontal: Boolean = false
//
//        fun xtr_setAlwaysBounceHorizontal(value: Boolean) {
//            alwaysBounceHorizontal = value
//        }
//
//    }
//
//}