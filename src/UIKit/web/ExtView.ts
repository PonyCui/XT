import { View } from "./View";
import { ExtViewElement } from "./element/ExtView";

export class ExtView extends View {

    static className: string

    nativeObject: any;

    constructor() {
        super(ExtViewElement);
        const className = (this.constructor as any).className
        if ((window as any)[className]) {
            this.nativeObject.setExtObject(new (window as any)[className])
            this.nativeObject.invoker = (methodName: string, args: any[]) => {
                try {
                    return this[methodName].apply(this, args)
                } catch (error) { }
            }
        }
    }

    defineFunction(prop: string): any {
        return function () {
            if (!this.nativeObject.extObject) { return }
            var args = []
            for (let index = 0; index < arguments.length; index++) {
                args.push(arguments[index])
            }
            return this.nativeObject.extObject[prop].apply(this.nativeObject.extObject[prop], args)
        }
    }

    defineProperty(prop: string, defaultValue: any = undefined): any {
        Object.defineProperty(this, prop, {
            get: () => {
                if (this.nativeObject.extObject) {
                    return this.nativeObject.extObject[prop]
                }
            },
            set: (newValue) => {
                if (this.nativeObject.extObject) {
                    this.nativeObject.extObject[prop] = newValue
                }
            },
        })
        return defaultValue
    }

}