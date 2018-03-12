/// <reference path="../xtc.d.ts" />
import { ClassType as IClassType, ClassLoader as IClassLoader } from '../interface/ClassLoader'

/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

export const ClassType = IClassType

export class ClassLoader extends IClassLoader {

    static loadClass(classType: IClassType, className: string, globalName: string): void {
        if (eval('typeof ' + globalName) !== "undefined") { return }
        if (classType == IClassType.Java) {
            if (_XTClassLoader.loadClass(className, globalName) !== true) {
                throw Error("ClassLoader load class '" + className + "' failed.")
            }
        }
    }

}