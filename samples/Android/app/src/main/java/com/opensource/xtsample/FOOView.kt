package com.opensource.xtsample

import android.content.Context
import android.graphics.Color
import android.support.v7.widget.SwitchCompat
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.widget.FrameLayout
import android.widget.Switch
import com.eclipsesource.v8.V8Object
import com.opensource.xtruntime.XTRCustomView
import com.opensource.xtruntime.XTRCustomViewProtocol

/**
 * Created by cuiminghui on 2017/9/27.
 */
class FOOView @JvmOverloads constructor(
        context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr), XTRCustomViewProtocol {

    init {
        val fooView = LayoutInflater.from(context).inflate(R.layout.fooview, this, false)
        addView(fooView)
    }

    override fun onMessage(message: V8Object, customView: XTRCustomView.InnerObject): Any? {
        (message.get("on") as? Boolean)?.let {
            (findViewById(R.id.fooSwitch) as Switch).isChecked = it
            return "Hello, World"
        }
        return null
    }

    override fun dispatchTouchEvent(ev: MotionEvent?): Boolean {
        return false
    }

}