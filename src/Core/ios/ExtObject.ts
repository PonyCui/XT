import { BaseObject } from "./BaseObject";

export class ExtObject extends BaseObject {

    constructor(objectRef: string | undefined = undefined, clazz: string | undefined = undefined) {
        super(undefined, false);
        if (objectRef) {
            this.objectRef = objectRef
        }
        else if (clazz) {
            XT.ClassLoader.loadClass(XT.ClassType.ObjC, clazz, "_meta_class_" + clazz);
            this.objectRef = _XTExtObject.create(clazz)
        }
        objectRefs[this.objectRef] = this
    }

    static defineStaticFunction(clazz: string, prop: string): any {
        XT.ClassLoader.loadClass(XT.ClassType.ObjC, clazz, "_meta_class_" + clazz);
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
            return _XTExtObject.xtr_callMethodArgumentsObjectRef(prop, arguments, this.objectRef)
        }
    }

    defineProperty(prop: string): any {
        Object.defineProperty(this, prop, {
            get: () => {
                return _XTExtObject.xtr_getValueObjectRef(prop, this.objectRef)
            },
            set: function (newValue) {
                _XTExtObject.xtr_setValuePropKeyObjectRef(newValue, prop, this.objectRef)
            },
        })
    }

}