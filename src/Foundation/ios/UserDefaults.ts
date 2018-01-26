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
            _XTFUserDefaults.xtr_setObjectForKeySuite(object, forKey, this.suite || "")
        } catch (error) { }
    }

    get(forKey: string): any {
        return _XTFUserDefaults.xtr_objectForKeySuite(forKey, this.suite || "")
    }

}