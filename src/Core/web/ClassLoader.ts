/// <reference path="../xtc.d.ts" />
import { ClassType as IClassType, ClassLoader as IClassLoader } from '../interface/ClassLoader'

/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

export const ClassType = IClassType

export class ClassLoader extends IClassLoader {

    static loadClass(classType: IClassType, className: string | Object, globalName: string): void {
        if (classType == IClassType.JavaScript && className instanceof Object) {
            (window as any)[globalName] = className
        }
    }

}