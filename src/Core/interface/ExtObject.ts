import { BaseObject } from "./BaseObject";

export class ExtObject extends BaseObject {

    constructor(objectRef: string | undefined = undefined, clazz: string | undefined = undefined) {
        super();
    }

    static defineStaticFunction(clazz: string, prop: string): any { }
    defineFunction(prop: string): any { }
    defineProperty(prop: string, defaultValue: any = undefined): any { }

}