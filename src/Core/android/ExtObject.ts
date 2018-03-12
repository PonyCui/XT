import { BaseObject } from "./BaseObject";

export class ExtObject extends BaseObject {

    constructor(objectRef: string | undefined = undefined, clazz: string | undefined = undefined) {
        super(undefined, false);
        if (objectRef) {
            this.objectRef = objectRef
        }
        else if (clazz) {
            try {
                XT.ClassLoader.loadClass(XT.ClassType.Java, clazz, "_meta_class_" + clazz);
            } catch (error) { }
            this.objectRef = _XTExtObject.create(clazz)
        }
        objectRefs[this.objectRef] = this
    }

    static defineStaticFunction(clazz: string, prop: string): any {
        try {
            XT.ClassLoader.loadClass(XT.ClassType.Java, clazz, "_meta_class_" + clazz);
        } catch (error) { }
        return function () {
            return eval("_meta_class_" + clazz + "." + prop + "()")
        }
    }

    defineFunction(prop: string): any {
        return function () {
            var args = []
            for (let index = 0; index < arguments.length; index++) {
                args.push(arguments[index])
            }
            return _XTExtObject.xtr_callMethod(prop, args, this.objectRef)
        }
    }

    defineProperty(prop: string, defaultValue: any = undefined): any {
        Object.defineProperty(this, prop, {
            get: () => {
                return _XTExtObject.xtr_getValue(prop, this.objectRef)
            },
            set: function (newValue) {
                _XTExtObject.xtr_setValue(newValue, prop, this.objectRef)
            },
        })
        if (defaultValue !== undefined) {
            this[prop] = defaultValue
        }
    }

}