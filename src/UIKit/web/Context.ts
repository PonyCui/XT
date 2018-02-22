import { ViewController } from "./ViewController";
import { Releasable } from "../interface/Releasable";
import { Application } from "./Application";
import { RectMake } from "../interface/Rect";

export class Context implements Releasable {

    retain(): this {
        return this
    }

    release(): this {
        return this
    }

    static bundleURL = "./"

    static startWithNamed(name: string, options: any, completion: (rootViewController: ViewController) => void): Context {
        return this.startWithURL(this.bundleURL + name, options, completion, () => { })
    }

    static startWithURL(url: string, options: any, completion: (rootViewController: ViewController) => void, failure: (error: Error) => void): Context {
        const ctx = new Context()
        const req = new XMLHttpRequest()
        req.addEventListener("loadend", () => {
            ctx.eval(req.responseText)
            if (ctx.application &&
                ctx.application.delegate &&
                ctx.application.delegate.window &&
                ctx.application.delegate.window.rootViewController) {
                completion(ctx.application.delegate.window.rootViewController)
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
        (node || document.body).appendChild(this.application.rootElement)
        window.addEventListener("resize", () => {
            this.resize()
        })
        this.resize()
    }

    public resize() {
        if (this.application === undefined || this.application.keyWindow === undefined) { return }
        this.application.keyWindow.frame = RectMake(0.0, 0.0, this.application.rootElement.clientWidth, this.application.rootElement.clientHeight)
    }

}