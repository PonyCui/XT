/// <reference path="../xtf.d.ts" />
/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */
import { UserDefaults as IUserDefaults } from '../interface/UserDefaults'

export class UserDefaults extends IUserDefaults {

    static standard: UserDefaults = new UserDefaults()

    constructor(readonly suite: string | undefined = undefined) {
        super(suite)
    }

    set(object: any, forKey: string): void {
        try {
            if (object instanceof Object) {
                _XTFUserDefaults.xtr_setObject("Object>>>" + JSON.stringify(object), forKey, this.suite || "")
            }
            else if (object instanceof Array) {
                _XTFUserDefaults.xtr_setObject("Array>>>" + JSON.stringify(object), forKey, this.suite || "")
            }
            else {
                _XTFUserDefaults.xtr_setObject(object, forKey, this.suite || "")
            }
        } catch (error) { }
    }

    get(forKey: string): any {
        const value = _XTFUserDefaults.xtr_objectForKey(forKey, this.suite || "")
        if (typeof value === "string" && value.indexOf("Object>>>") === 0) {
            return JSON.parse(value.replace("Object>>>", ""))
        }
        else if (typeof value === "string" && value.indexOf("Array>>>") === 0) {
            return JSON.parse(value.replace("Array>>>", ""))
        }
        return value
    }

}