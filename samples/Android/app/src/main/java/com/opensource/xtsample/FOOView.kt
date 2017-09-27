package com.opensource.xtsample

import android.content.Context
import android.graphics.Color
import android.support.v7.widget.SwitchCompat
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import android.widget.FrameLayout
import android.widget.Switch
import com.opensource.xtruntime.XTRCustomView
import com.opensource.xtruntime.XTRCustomViewProtocol
import org.mozilla.javascript.NativeObject

/**
 * Created by cuiminghui on 2017/9/27.
 */
class FOOView @JvmOverloads constructor(
        context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr), XTRCustomViewProtocol {

    inner class Result(var alpha: Double)

    init {
        val fooView = LayoutInflater.from(context).inflate(R.layout.fooview, this, false)
        addView(fooView)
    }

    override fun onMessage(message: Any?, customView: XTRCustomView.InnerObject): Any? {
        ((message as? NativeObject)?.get("on") as? Boolean)?.let {
            (findViewById(R.id.fooSwitch) as Switch).isChecked = it
            val ackResult = customView.emitMessage(Result(if (it) 0.5 else 1.0))
            System.out.println(ackResult)
            return "Hello, World"
        }
        return null
    }

}