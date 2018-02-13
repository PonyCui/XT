import { ViewController } from "./ViewController";

export class Context {

    static startWithNamed(name: string, options: any, completion: (rootViewController: ViewController) => void): Context {
        const contextRef = _XTUIContext.xtr_startWithNamedOptionsCompletion(name, options, (rootViewControllerRef: any) => {
            if (typeof rootViewControllerRef === "string") {
                completion(new ViewController(rootViewControllerRef))
            }
        })
        return new Context(contextRef)
    }

    static startWithURL(url: string, options: any, completion: (rootViewController: ViewController) => void, failure: (error: Error) => void): Context { throw Error("Not Implement.") }

    retain(): this {
        _XTRetain(this.objectRef)
        return this
    }

    release(): this {
        _XTRelease(this.objectRef)
        return this
    }

    constructor(readonly objectRef: any) {
        if (typeof objectRef === "string") {
            if (objectRefs[objectRef]) {
                return objectRefs[objectRef]
            }
            this.objectRef = objectRef;
            objectRefs[this.objectRef] = this;
        }
    }

}