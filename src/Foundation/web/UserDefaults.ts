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
        const storageKey = JSON.stringify({ forKey, suite: this.suite || "Default" })
        if (object === undefined) {
            localStorage.removeItem(storageKey)
        }
        else {
            localStorage.setItem(storageKey, JSON.stringify({ value: object }))
        }
    }

    get(forKey: string): any {
        const storageKey = JSON.stringify({ forKey, suite: this.suite || "Default" })
        try {
            return JSON.parse(localStorage.getItem(storageKey) || "{}").value
        } catch (error) {
            return undefined
        }
    }

}