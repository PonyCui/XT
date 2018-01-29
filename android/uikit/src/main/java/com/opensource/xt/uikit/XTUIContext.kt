package com.opensource.xt.uikit

import android.os.Handler
import android.util.Log
import com.opensource.xt.core.XTContext
import com.opensource.xt.core.XTComponentExport
import okhttp3.OkHttpClient
import okhttp3.Request

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTUIContext(appContext: android.content.Context,
                  val sourceURL: String?,
                  val completionBlock: ((bridge: XTUIContext) -> Unit)? = null,
                  val failureBlock: ((e: Exception) -> Unit)? = null): XTContext(appContext) {

    companion object {

        fun createWithAssets(appContext: android.content.Context,
                             assetsName: String,
                             completionBlock: ((bridge: XTUIContext) -> Unit)? = null): XTUIContext {
            return XTUIContext(appContext, "file:///android_asset/$assetsName", completionBlock)
        }

        fun createWithSourceURL(appContext: android.content.Context,
                                sourceURL: String?,
                                completionBlock: ((bridge: XTUIContext) -> Unit)? = null,
                                failureBlock: ((e: Exception) -> Unit)? = null): XTUIContext {
            return XTUIContext(appContext, sourceURL, completionBlock, failureBlock)
        }

    }

    var application: XTUIApplication? = null
    private var isUIContextDidSetup = false

    init {
        Handler().post({
            loadViaSourceURL()
        })
    }

    override fun setup() {
        super.setup()
        if (!isUIContextDidSetup) {
            loadComponents()
            loadScript()
            isUIContextDidSetup = true
        }
    }

    private fun loadComponents() {
        val components: List<XTComponentExport> = listOf(
                XTUIImage.JSExports(this),
                XTUIApplication.JSExports(this),
                XTUIApplicationDelegate.JSExports(this),
                XTUIView.JSExports(this),
                XTUIWindow.JSExports(this),
                XTUIViewController.JSExports(this),
                XTUIButton.JSExports(this),
                XTUIImageView.JSExports(this),
                XTUILabel.JSExports(this),
                XTUICanvasView.JSExports(this),
                XTUITextField.JSExports(this),
                XTUITextView.JSExports(this),
                XTUIDevice.JSExports(this),
                XTUIScreen.JSExports(this),
                XTUINavigationController.JSExports(this),
                XTUIScrollView.JSExports(this),
                XTUITextMeasurer.JSExports(this),
                XTUICustomView.JSExports(this),
                XTUIFont.JSExports(this),
                XTUIHRView.JSExports(this),
                XTUINavigationBar.JSExports(this),
                XTUIModal.JSExports(this),
                XTUIWebView.JSExports(this),
                XTUISwitch.JSExports(this),
                XTUISlider.JSExports(this),
                XTUIActivityIndicatorView.JSExports(this)
        )
        components.forEach {
            val obj = it.exports()
            this.runtime.add(it.name, obj)
            obj.release()
            _registeredComponents.put(it.name, it)
        }
    }

    private fun loadScript() {
        this.appContext.assets.open("xt.uikit.android.min.js")?.let {
            val byteArray = ByteArray(it.available())
            it.read(byteArray)
            String(byteArray).let { this.evaluateScript(it) }
            it.close()
        }
    }

    private fun loadViaSourceURL() {
        val handler = Handler()
        sourceURL?.let { sourceURL ->
            if (sourceURL.startsWith("file://")) {
                if (sourceURL.startsWith("file:///android_asset/")) {
                    sourceURL.replace("file:///android_asset/", "").let {
                        try {
                            val inputStream = appContext.assets.open(it)
                            val byteArray = ByteArray(inputStream.available())
                            inputStream.read(byteArray)
                            inputStream.close()
                            val script = String(byteArray)
                            handler.post {
                                this.evaluateScript(script)
                                application?.delegate?.didFinishLaunchWithOptions(mapOf())
                                completionBlock?.invoke(this)
                            }
                        } catch (e: java.lang.Exception) { handler.post { failureBlock?.invoke(e) };  e.printStackTrace() }
                    }
                }
            }
            else if (sourceURL.startsWith("http://") || sourceURL.startsWith("https://")) {
                Thread(Thread.currentThread().threadGroup, {
                    try {
                        val req = Request.Builder().url(sourceURL).method("GET", null).build()
                        val res = OkHttpClient().newCall(req).execute()
                        val script = res.body()?.string() ?: return@Thread
                        handler.post {
                            this.evaluateScript(script)
                            application?.delegate?.didFinishLaunchWithOptions(mapOf())
                            completionBlock?.invoke(this)
                        }
                    } catch (e: Exception) { handler.post { failureBlock?.invoke(e) }; e.printStackTrace() }
                }, "XTUIEval").start()
            }
            else {
                Log.w("XTUIContext", "Unknown sourceURL type >>> $sourceURL")
            }
            return
        }
    }

}