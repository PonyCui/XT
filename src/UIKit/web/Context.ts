import { ViewController } from "./ViewController";
import { Application } from "./Application";
import { RectMake } from "../interface/Rect";

export class Context extends XT.BaseObject {

    static bundleURL: string | undefined = undefined

    static startWithNamed(name: string, options: any, completion: (rootViewController: ViewController, context: Context) => void): Context {
        return this.startWithURL((this.bundleURL || "./") + name, options, completion, () => { })
    }

    static startWithURL(url: string, options: any, completion: (rootViewController: ViewController, context: Context) => void, failure: (error: Error) => void): Context {
        const ctx = new Context()
        const req = new XMLHttpRequest()
        req.addEventListener("loadend", () => {
            (window as any).__XT_CONTEXT_OPTIONS__ = options || {};
            ctx.eval(req.responseText)
            if (ctx.application &&
                ctx.application.delegate &&
                ctx.application.delegate.window &&
                ctx.application.delegate.window.rootViewController) {
                completion(ctx.application.delegate.window.rootViewController, ctx)
            }
            else {
                failure(new Error("No RootViewController"));
            }
        })
        req.addEventListener("error", (e) => {
            failure(e.error)
        })
        req.open("GET", url, true)
        req.timeout = 15000
        req.send()
        return ctx
    }

    private application?: Application = undefined
    private attachNode?: HTMLElement = undefined

    private eval(code: string) {
        (window as any).__XT_CONTEXT__ = this;
        (function () {
            try {
                eval(code);
            } catch (error) { }
        })();
        (window as any).__XT_CONTEXT__ = undefined;
    }

    public attachTo(node: HTMLElement | undefined) {
        if (this.application === undefined) { return }
        this.attachNode = node || document.body;
        this.attachNode.appendChild(this.application.rootElement)
        if (this.attachNode === document.body && this.application.keyWindow) {
            this.application.keyWindow.isBody = true
        }
        let previousOrientation = document.body.clientWidth > document.body.clientHeight ? 1 : 0
        let inputMode = false
        window.addEventListener("resize", () => {
            if (document.activeElement instanceof HTMLInputElement ||
                document.activeElement instanceof HTMLTextAreaElement) {
                inputMode = true
                return;
            }
            else if (inputMode) {
                if (this.attachNode && this.application && this.application.rootElement) {
                    this.attachNode.removeChild(this.application.rootElement)
                    this.attachNode.appendChild(this.application.rootElement)
                    this.resize()
                }
                inputMode = false
                return;
            }
            let currentOrientation = document.body.clientWidth > document.body.clientHeight ? 1 : 0
            if (currentOrientation != previousOrientation) {
                window.location.reload()
            }
            else if (this.attachNode && this.application && this.application.rootElement) {
                this.resize()
            }
        })
        this.resize()
    }

    public resize() {
        if (this.application === undefined || this.application.keyWindow === undefined || this.attachNode === undefined) { return }
        this.application.keyWindow.frame = RectMake(0.0, 0.0, this.attachNode.clientWidth, this.attachNode.clientHeight)
    }

}