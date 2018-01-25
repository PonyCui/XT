//package com.opensource.xtsample
//
//import android.content.Context
//import android.util.AttributeSet
//import android.view.LayoutInflater
//import android.view.MotionEvent
//import android.widget.FrameLayout
//import android.widget.Switch
//import com.eclipsesource.v8.V8Object
//import com.opensource.xt.uikit.XTRCustomView
//import com.opensource.xt.uikit.XTRCustomView.Protocol
//
///**
// * Created by cuiminghui on 2017/9/27.
// */
//class FOOView @JvmOverloads constructor(
//        context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
//) : FrameLayout(context, attrs, defStyleAttr), XTRCustomView.Protocol {
//
//    override fun getProps(): Map<String, Any> {
//        return mapOf(
//                Pair("on", (findViewById(R.id.fooSwitch) as Switch).isChecked)
//        )
//    }
//
//    override fun setProps(value: Map<String, Any>) {
//        (value["on"] as? Boolean)?.let {
//            (findViewById(R.id.fooSwitch) as Switch).isChecked = it
//        }
//    }
//
//    init {
//        val fooView = LayoutInflater.from(context).inflate(R.layout.fooview, this, false)
//        addView(fooView)
//    }
//
//    override fun onMessage(message: V8Object, customView: XTRCustomView): Any? {
//        return null
//    }
//
//    override fun dispatchTouchEvent(ev: MotionEvent?): Boolean {
//        return false
//    }
//
//}