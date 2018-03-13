import { BaseObject } from "./BaseObject";

export class ExtObject extends BaseObject {

    private static _className: string

    public static get className(): string {
        return this._className;
    }

    public static set className(value: string) {
        this._className = value;
        this.register()
    }

    static register(): void {
        try {
            XT.ClassLoader.loadClass(XT.ClassType.JavaScript, this.className, "_meta_class_" + this.className);
        } catch (error) { }
    }

    nativeObject: any

    constructor(objectRef: string | undefined = undefined) {
        super(undefined, false);
        this.nativeObject = eval('new ' + "_meta_class_" + (this.constructor as typeof ExtObject).className)
        this.nativeObject.invoker = (methodName: string, args: any[]) => {
            try {
                return this[methodName].apply(this, args)
            } catch (error) { }
        }
    }

    static defineFunction(prop: string): any {
        return function () {
            return eval("_meta_class_" + this.className + '.' + prop + '()')
        }
    }

    defineFunction(prop: string): any {
        return function () {
            var args = []
            for (let index = 0; index < arguments.length; index++) {
                args.push(arguments[index])
            }
            return this.nativeObject[prop].apply(this.nativeObject, args)
        }
    }

    defineProperty(prop: string, defaultValue: any = undefined): any {
        Object.defineProperty(this, prop, {
            get: () => {
                return this.nativeObject[prop]
            },
            set: (newValue) => {
                this.nativeObject[prop] = newValue
            },
        })
        return defaultValue
    }

}