import { BaseObject } from "./BaseObject";

export class ExtObject extends BaseObject {

    nativeObject: any

    constructor(objectRef: string | undefined = undefined, clazz: string | undefined = undefined) {
        super(undefined, false);
        if (clazz) {
            try {
                XT.ClassLoader.loadClass(XT.ClassType.JavaScript, clazz, "_meta_class_" + clazz);
            } catch (error) { }
            this.nativeObject = eval('new ' + "_meta_class_" + clazz)
        }
    }

    static defineStaticFunction(clazz: string, prop: string): any {
        try {
            XT.ClassLoader.loadClass(XT.ClassType.JavaScript, clazz, "_meta_class_" + clazz);
        } catch (error) { }
        return function () {
            return eval("_meta_class_" + clazz + '.' + prop + '()')
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
                if (newValue instanceof Error) { return; }
                this.nativeObject[prop] = newValue
            },
        })
        if (defaultValue !== undefined) {
            this[prop] = defaultValue
        }
        return Error()
    }

}