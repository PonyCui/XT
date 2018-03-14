package com.opensource.ext.implementations

import android.content.Context
import android.graphics.Color
import android.util.AttributeSet
import android.view.View
import com.opensource.xt.uikit.XTUIContext
import com.opensource.xt.uikit.XTUIExtView

/**
 * Created by cuiminghui on 2018/3/13.
 */
class FooView @JvmOverloads constructor(
        context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    var fooColor: String = ""
        set(value) {
            field = value
            when (value) {
                "gray" -> this.setBackgroundColor(Color.GRAY)
                "green" -> this.setBackgroundColor(Color.GREEN)
            }
        }

}