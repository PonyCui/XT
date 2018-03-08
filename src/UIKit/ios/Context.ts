import { ViewController } from "./ViewController";

export class Context extends XT.BaseObject {

    static startWithNamed(name: string, options: any, completion: (rootViewController: ViewController) => void): Context {
        const contextRef = _XTUIContext.xtr_startWithNamedOptionsCompletion(name, options, (rootViewControllerRef: any) => {
            if (typeof rootViewControllerRef === "string") {
                completion(ViewController.findByRef(rootViewControllerRef))
            }
        })
        return new Context(contextRef)
    }

    static startWithURL(url: string, options: any, completion: (rootViewController: ViewController) => void, failure: (error: Error) => void): Context {
        const contextRef = _XTUIContext.xtr_startWithURLOptionsCompletionFailure(url, options, (rootViewControllerRef: any) => {
            if (typeof rootViewControllerRef === "string") {
                completion(ViewController.findByRef(rootViewControllerRef))
            }
        }, (msg: string) => {
            failure(new Error(msg))
        })
        return new Context(contextRef)
    }

    constructor(readonly objectRef: any) {
        super()
        if (typeof objectRef === "string") {
            if (objectRefs[objectRef]) {
                return objectRefs[objectRef]
            }
            this.objectRef = objectRef;
            objectRefs[this.objectRef] = this;
        }
    }

}