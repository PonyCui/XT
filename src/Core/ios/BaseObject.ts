declare var Proxy: any

const supportProxy = typeof Proxy === "object"

export class BaseObject {

    [key: string]: any;

    private _objectRef: string

	public get objectRef(): string  {
		return this._objectRef;
	}

	public set objectRef(value: string) {
        this._objectRef = value;
        if (!supportProxy) {
            this.retain()
        }
	}

    retain(owner: any = undefined): this {
        _XTRetain(this.objectRef, owner)
        return this
    }

    release(): this {
        _XTRelease(this.objectRef)
        return this
    }

    private isDealloced = false

    dealloc() {
        if (this.isDealloced) { return }
        this.isDealloced = true
        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                const element: any = this[key];
                if (element instanceof BaseObject) {
                    element.release()
                }
            }
        }
    }

    constructor(objects: { [key: string]: any } | undefined = undefined) {
        if (this.constructor === BaseObject) {
            this.objectRef = _XTBaseObject.create()
            objectRefs[this.objectRef] = this
        }
        if (supportProxy) {
            const proxy = new Proxy(this, {
                set: function (obj: any, prop: any, value: any) {
                    if (obj[prop] instanceof BaseObject) {
                        obj[prop].release()
                    }
                    obj[prop] = value
                    if (value instanceof BaseObject) {
                        value.retain()
                    }
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

}