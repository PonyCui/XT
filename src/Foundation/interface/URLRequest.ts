/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */
import { Releasable } from "./Releasable";
import { Data } from "./Data";

export enum URLCachePolily {
    UseProtocolCachePolicy = 0,
    ReloadIgnoringLocalCacheData = 1,
    ReturnCacheDataElseLoad = 2,
    ReturnCacheDataDontLoad = 3,
}

export class URLRequest implements Releasable {

    readonly url: string
    readonly timeout: number
    readonly cachePolicy: URLCachePolily
    readonly nativeObject: any;

    constructor(url: string, timeout = 15, cachePolicy: URLCachePolily = URLCachePolily.UseProtocolCachePolicy) {
        this.url = url
        this.timeout = timeout
        this.cachePolicy = cachePolicy
    }

    setHTTPMethod(value: string): void { }
    setHTTPHeader(value: string, key: string): void { }
    setHTTPBody(value: string | Data): void { }

    retain(): this {
        throw new Error("Method not implemented.");
    }

    release(): this {
        throw new Error("Method not implemented.");
    }

}