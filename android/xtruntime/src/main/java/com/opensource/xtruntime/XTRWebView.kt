package com.opensource.xtruntime

import android.graphics.Bitmap
import android.util.AttributeSet
import android.view.ViewGroup
import android.webkit.*
import com.eclipsesource.v8.V8Object
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager

/**
 * Created by cuiminghui on 2018/1/22.
 */
class XTRWebView @JvmOverloads constructor(
        xtrContext: XTRContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTRView(xtrContext, attrs, defStyleAttr), XTRComponentInstance {

    private val innerView = WebView(context)

    init {
        innerView.setWebChromeClient(WebChromeClient())
        innerView.setWebViewClient(object: WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                scriptObject()?.let {
                    XTRContext.invokeMethod(it, "handleStart")
                    it.release()
                }
            }
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                scriptObject()?.let {
                    XTRContext.invokeMethod(it, "handleFinish")
                    it.release()
                }
            }
            override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
                super.onReceivedError(view, request, error)
                scriptObject()?.let {
                    XTRContext.invokeMethod(it, "handleFail", listOf(error?.toString() ?: ""))
                    it.release()
                }
            }
        })
        innerView.settings.javaScriptEnabled = true
        innerView.settings.databaseEnabled = true
        innerView.settings.domStorageEnabled = true
        innerView.settings.useWideViewPort = true
        addView(innerView, LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
    }

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRWebView"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_loadWithURLString", "xtr_loadWithURLString", arrayOf(String::class.java, String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTRWebView(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_loadWithURLString(URLString: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRWebView)?.let {
                it.innerView.loadUrl(URLString)
            }
        }

    }

}