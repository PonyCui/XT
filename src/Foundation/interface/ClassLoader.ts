/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

export enum ClassType {
    Unknown,
    ObjC,
    Java,
}

export class ClassLoader {

    static loadClass(classType: ClassType, className: string, globalName: string): void { throw Error("Not Implemented") }

}