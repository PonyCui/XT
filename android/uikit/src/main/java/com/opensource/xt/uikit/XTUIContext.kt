package com.opensource.xt.uikit

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Handler
import android.util.Log
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTContext
import com.opensource.xt.core.XTDebug
import com.opensource.xt.core.XTDebugDelegate
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.File
import java.net.URI

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTUIContext(appContext: android.content.Context,
                  val sourceURL: String?,
                  val completionBlock: ((bridge: XTUIContext) -> Unit)? = null,
                  val failureBlock: ((e: Exception) -> Unit)? = null): XTContext(appContext) {

    companion object: XTDebugDelegate {

        internal var currentUIContextInstance: XTUIContext? = null

        private var defaultAttachContext: MutableList<Class<XTContext>> = mutableListOf()

        fun addDefaultAttachContext(attachContextClass: Class<XTContext>) {
            if (XTContext::class.java.isAssignableFrom(attachContextClass) && !defaultAttachContext.contains(attachContextClass)) {
                defaultAttachContext.add(attachContextClass)
            }
        }

        fun createWithAssets(appContext: android.content.Context,
                             assetsName: String,
                             completionBlock: ((uiContext: XTUIContext) -> Unit)? = null): XTUIContext {
            return createWithSourceURL(appContext, "file:///android_asset/$assetsName", completionBlock)
        }

        fun createWithSourceURL(appContext: android.content.Context,
                                sourceURL: String?,
                                completionBlock: ((uiContext: XTUIContext) -> Unit)? = null,
                                failureBlock: ((e: Exception) -> Unit)? = null): XTUIContext {
            val context = XTUIContext(appContext, sourceURL, completionBlock, failureBlock)
            defaultAttachContext.forEach {
                try {
                    it.getDeclaredConstructor(android.content.Context::class.java, XTContext::class.java)
                            .newInstance(appContext, context)
                } catch (e: Exception) { e.printStackTrace() }
            }
            return context
        }

        var currentDebugApplicationContext: Context? = null
        var currentDebugContext: XTUIContext? = null

        override fun debuggerDidTerminal() {
            currentDebugContext?.let { currentDebugContext ->
                currentDebugContext.sharedHandler.post {
                    currentDebugContext.release()
                    this.currentDebugContext = null
                }
            }
        }

        override fun debuggerDidReload() {
            currentDebugApplicationContext?.let { currentDebugApplicationContext ->
                Handler(currentDebugApplicationContext.mainLooper).post {
                    XTDebug.sharedDebugger.sourceURL?.let {
                        currentDebugContext = XTUIContext.createWithSourceURL(currentDebugApplicationContext, it, {
                            it.start()
                        })
                        XTDebug.sharedDebugger.debugContext = currentDebugContext
                    }
                }
            }
        }

        override fun debuggerEval(code: String, callback: (value: String) -> Unit) {
            currentDebugContext?.let { currentDebugContext ->
                currentDebugContext.sharedHandler.post {
                    try {
                        callback(currentDebugContext.evaluateScript(code) as? String ?: "")
                    } catch (e: Exception) { callback(e.message ?: "") }
                }
            }
        }

    }

    var application: XTUIApplication? = null

    private var isUIContextDidSetup = false

    init {
        Handler().post({
            loadViaSourceURL()
        })
    }

    fun start() {
        XTUIContext.currentUIContextInstance = this
        val intent = Intent(appContext, XTUIActivity::class.java)
        intent.putExtra("XTUIShowBackButton", true)
        appContext.startActivity(intent)
    }

    fun attach(activity: Activity) {
        this.application?.delegate?.window?.rootViewController?.setContentView(activity)
    }

    fun attach(activity: Activity, fragmentID: Int) {
        this.application?.delegate?.window?.rootViewController?.attachFragment(activity, fragmentID)
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
                try {
                    val inputStream = if (sourceURL.startsWith("file:///android_asset/")) appContext.assets.open(sourceURL.replace("file:///android_asset/", "")) else File(URI.create(sourceURL)).inputStream()
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

    override fun release() {
        super.release()
        (application?.delegate?.window?.rootViewController as? XTUINavigationController)?.let {
            it.childViewControllers?.forEach {
                it.activity?.finish()
            }
        }
        application?.delegate?.window?.rootViewController?.activity?.finish()
    }

}