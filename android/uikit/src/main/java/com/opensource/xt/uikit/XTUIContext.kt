package com.opensource.xt.uikit

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Handler
import android.util.Log
import com.eclipsesource.v8.V8Function
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.utils.V8ObjectUtils
import com.opensource.xt.core.*
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.File
import java.net.URI
import kotlin.system.measureTimeMillis

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTUIContext(appContext: android.content.Context,
                  val sourceURL: String?,
                  val options: Map<String, Any>?,
                  val completionBlock: ((bridge: XTUIContext) -> Unit)? = null,
                  val failureBlock: ((e: Exception) -> Unit)? = null): XTContext(appContext), XTComponentInstance {

    companion object: XTDebugDelegate {

        private var defaultAttachContext: MutableList<Class<XTContext>> = mutableListOf()

        fun addDefaultAttachContext(attachContextClass: Class<XTContext>) {
            if (XTContext::class.java.isAssignableFrom(attachContextClass) && !defaultAttachContext.contains(attachContextClass)) {
                defaultAttachContext.add(attachContextClass)
            }
        }

        fun createWithAssets(appContext: android.content.Context,
                             assetsName: String,
                             options: Map<String, Any>?,
                             completionBlock: ((uiContext: XTUIContext) -> Unit)? = null): XTUIContext {
            return createWithSourceURL(appContext, "file:///android_asset/$assetsName", options, completionBlock)
        }

        fun createWithSourceURL(appContext: android.content.Context,
                                sourceURL: String?,
                                options: Map<String, Any>?,
                                completionBlock: ((uiContext: XTUIContext) -> Unit)? = null,
                                failureBlock: ((e: Exception) -> Unit)? = null): XTUIContext {
            val context = XTUIContext(appContext, sourceURL, options, completionBlock, failureBlock)
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
                        currentDebugContext = XTUIContext.createWithSourceURL(currentDebugApplicationContext, it, mapOf(Pair("onDebug", true)), {
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

    class JSExports(val context: XTUIContext): XTComponentExport() {

        override val name: String = "_XTUIContext"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "xtr_startWithNamed", "xtr_startWithNamed", arrayOf(String::class.java, V8Object::class.java, V8Function::class.java))
            exports.registerJavaMethod(this, "xtr_startWithURL", "xtr_startWithURL", arrayOf(String::class.java, V8Object::class.java, V8Function::class.java, V8Function::class.java))
            return exports
        }

        fun xtr_startWithNamed(name: String, options: V8Object, completion: V8Function): String {
            val completion = completion.twin()
            val createOptions = mutableMapOf<String, Any>()
            try {
                V8ObjectUtils.toMap(options).forEach {
                    it.value?.let { value ->
                        createOptions.put(it.key, value)
                    }
                }
            } catch (e: Exception) {}
            val context = XTUIContext.createWithAssets(context.appContext, name, createOptions.toMap(), {
                XTContext.callWithArgument(completion, it.application?.delegate?.window?.rootViewController?.objectUUID)
                XTContext.release(completion)
            })
            val managedObject = XTManagedObject(context)
            context.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_startWithURL(URLString: String, options: V8Object, completion: V8Function, failure: V8Function): String {
            val completion = completion.twin()
            val failure = failure.twin()
            val createOptions = mutableMapOf<String, Any>()
            try {
                V8ObjectUtils.toMap(options).forEach {
                    it.value?.let { value ->
                        createOptions.put(it.key, value)
                    }
                }
            } catch (e: Exception) {}
            val context = XTUIContext.createWithSourceURL(context.appContext, URLString, createOptions, {
                XTContext.callWithArgument(completion, it.application?.delegate?.window?.rootViewController?.objectUUID)
                XTContext.release(completion, failure)
            }, {
                XTContext.callWithArgument(failure, it.message ?: "")
                XTContext.release(completion, failure)
            })
            val managedObject = XTManagedObject(context)
            context.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

    }

    var application: XTUIApplication? = null

    override var objectUUID: String? = null

    private var isUIContextDidSetup = false

    init {
        Handler().post({
            loadViaSourceURL()
        })
    }

    fun start() {
        val intent = Intent(appContext, XTUIActivity::class.java)
        intent.putExtra("XTUIShowBackButton", true)
        this.application?.delegate?.window?.rootViewController?.objectUUID?.let {
            intent.putExtra("ViewControllerObjectUUID", it)
        }
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
                XTUIContext.JSExports(this),
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
            XTContext.release(obj)
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
                        application?.delegate?.didFinishLaunchWithOptions(options ?: mapOf(), application!!)
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
                            application?.delegate?.didFinishLaunchWithOptions(options ?: mapOf(), application!!)
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