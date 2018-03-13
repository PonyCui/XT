import { View } from "./View";
import { ExtViewElement } from "./element/ExtView";

export interface ExtViewOptions {
    initializer: () => HTMLElement
    getter: (propKey: string, obj: HTMLElement) => any;
    setter: (newValue: any, propKey: string, obj: HTMLElement) => void;
    caller: (methodName: string, args: any[], obj: HTMLElement) => any;
}

export class ExtView extends View {

    static className: string

    nativeObject: any;

    constructor() {
        super(ExtViewElement);
        const className = (this.constructor as any).className
        if ((window as any)[className]) {
            this.nativeObject.setExtObject(new (window as any)[className])
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

    // Private Methods

    // static registeredClasses: { [key: string]: ExtViewOptions } = {}

    // static register(className: string, options: ExtViewOptions) {
    //     this.registeredClasses[className] = options
    // }

}