import { BaseObject } from "./BaseObject";

export class ExtObject extends BaseObject {

    static className: string
    static defineFunction(prop: string): any { }
    defineFunction(prop: string): any { }
    defineProperty(prop: string, defaultValue: any = undefined): any { }

}