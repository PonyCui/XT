package com.opensource.xt.uikit

import android.graphics.Bitmap
import android.util.AttributeSet
import android.view.ViewGroup
import android.webkit.*
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.*

/**
 * Created by cuiminghui on 2018/1/22.
 */
class XTUIWebView @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTComponentInstance {

    private val innerView = WebView(context)

    init {
        innerView.setWebChromeClient(WebChromeClient())
        innerView.setWebViewClient(object: WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                scriptObject()?.let {
                    XTContext.invokeMethod(it, "handleStart")
                    XTContext.release(it)
                }
            }
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                scriptObject()?.let {
                    XTContext.invokeMethod(it, "handleFinish")
                    XTContext.release(it)
                }
            }
            override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
                super.onReceivedError(view, request, error)
                scriptObject()?.let {
                    XTContext.invokeMethod(it, "handleFail", listOf(error?.toString() ?: ""))
                    XTContext.release(it)
                }
            }
        })
        innerView.settings.javaScriptEnabled = true
        innerView.settings.databaseEnabled = true
        innerView.settings.domStorageEnabled = true
        innerView.settings.useWideViewPort = true
        addView(innerView, LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
    }

    class JSExports(context: XTUIContext): XTUIView.JSExports(context) {

        override val name: String = "_XTUIWebView"

        override val viewClass: Class<XTUIView> = XTUIWebView::class.java as Class<XTUIView>

        override fun exports(): V8Object {
            val exports = super.exports()
            exports.registerJavaMethod(this, "xtr_loadWithURLString", "xtr_loadWithURLString", arrayOf(String::class.java, String::class.java))
            return exports
        }

        fun xtr_loadWithURLString(URLString: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIWebView)?.let {
                it.innerView.loadUrl(URLString)
            }
        }

    }

}