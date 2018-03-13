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

    constructor(objectRef: string | undefined = undefined) {
        super(undefined, false);
        if (objectRef) {
            this.objectRef = objectRef
        }
        else {
            this.objectRef = _XTExtObject.create((this.constructor as typeof ExtObject).className)
        }
        objectRefs[this.objectRef] = this
    }

    static register(): void {
        try {
            XT.ClassLoader.loadClass(XT.ClassType.ObjC, this.className, "_meta_class_" + this.className);
            (ExtObject as any)[this.className] = this
        } catch (error) { }
    }

    static defineFunction(prop: string): any {
        return function () {
            return eval("_meta_class_" + this.className + "." + prop + "()")
        }
    }

    defineFunction(prop: string): any {
        return function () {
            var args = []
            for (let index = 0; index < arguments.length; index++) {
                args.push(arguments[index])
            }
            return _XTExtObject.xtr_callMethodArgumentsObjectRef(prop, args, this.objectRef)
        }
    }

    defineProperty(prop: string, defaultValue: any = undefined): any {
        Object.defineProperty(this, prop, {
            get: () => {
                return _XTExtObject.xtr_getValueObjectRef(prop, this.objectRef)
            },
            set: (newValue) => {
                _XTExtObject.xtr_setValuePropKeyObjectRef(newValue, prop, this.objectRef)
            },
        })
        return defaultValue
    }

}