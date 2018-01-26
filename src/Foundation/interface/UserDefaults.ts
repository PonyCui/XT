/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

export class UserDefaults {

    static standard: UserDefaults
    constructor(suite: string | undefined = undefined) { }
    set(object: any, forKey: string): void { }
    get(forKey: string): any { }

}