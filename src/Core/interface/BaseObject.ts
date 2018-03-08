
export class BaseObject {
    [key: string]: any;
    retain(owner?: any): this { return this }
    release(): this { return this }
    dealloc(): void { }
    constructor(objects: { [key: string]: any } | undefined = undefined) { }
}