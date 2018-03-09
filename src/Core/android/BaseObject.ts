declare var Proxy: any

export class BaseObject {

    [key: string]: any;

    public objectRef: string

    retain(owner: any = undefined): this {
        _XTRetain(this.objectRef, owner)
        return this
    }

    release(): this {
        _XTRelease(this.objectRef)
        return this
    }

    constructor(objects: { [key: string]: any } | undefined = undefined) {
        if (this.constructor === BaseObject) {
            this.objectRef = _XTBaseObject.create()
            objectRefs[this.objectRef] = this
        }
        const proxy = new Proxy(this, {
            set: function (obj: any, prop: any, value: any) {
                if (obj[prop] instanceof BaseObject) {
                    obj[prop].release()
                }
                obj[prop] = value
                if (value instanceof BaseObject && obj instanceof BaseObject) {
                    value.retain(obj)
                }
                return true
            }
        })
        if (objects) {
            for (const key in objects) {
                proxy[key] = objects[key]
            }
        }
        return proxy
    }

}