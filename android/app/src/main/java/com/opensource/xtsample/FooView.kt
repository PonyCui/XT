package com.opensource.xtsample

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

    companion object {

        fun register() {
            XTUIExtView.registerClass(FooView::class.java, object : XTUIExtView.XTUIExtOptions<FooView> {

                override fun doInit(context: XTUIContext): FooView {
                    return FooView(context.appContext)
                }

                override fun doGetValue(propKey: String, obj: FooView): Object? {
                    if (propKey == "fooColor") {
                        return obj.fooColor as? Object
                    }
                    return null
                }

                override fun doSetValue(value: Object, propKey: String, obj: FooView) {
                    if (propKey == "fooColor") {
                        (value as? String)?.let {
                            obj.fooColor = it
                        }
                    }
                }

                override fun doCall(methodName: String, arguments: List<Any>, obj: FooView): Object? {
                    return null
                }

            })
        }

    }

}