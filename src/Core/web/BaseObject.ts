export class BaseObject {

    [key: string]: any;

    public objectRef: string;

    retain(owner: any = undefined): this {
        return this
    }

    release(): this {
        return this
    }

    constructor(objects: { [key: string]: any } | undefined = undefined, isBaseObject: boolean = true) {
        if (objects) {
            for (const key in objects) {
                this[key] = objects[key]
            }
        }
    }

}