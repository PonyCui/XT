/// <reference path="../xtf.d.ts" />
/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

import { URLRequest as IURLRequest, URLCachePolily as IURLCachePolily } from '../interface/URLRequest'
import { Data } from './Data';

export const URLCachePolily = IURLCachePolily

export class URLRequest extends IURLRequest {

    readonly url: string
    readonly timeout: number
    readonly cachePolicy: number
    readonly objectRef: any

    constructor(url: string, timeout = 15, cachePolicy: IURLCachePolily = URLCachePolily.UseProtocolCachePolicy) {
        super(url, timeout, cachePolicy);
        this.objectRef = _XTFURLRequest.createTimeoutCachePolicy(url, timeout, cachePolicy);
    }

    setHTTPMethod(value: "GET" | "POST" | "PUT" | "DELETE"): void {
        _XTFURLRequest.xtr_setHTTPMethodObjectRef(value, this.objectRef)
    }

    setHTTPHeader(value: string, key: string): void {
        _XTFURLRequest.xtr_setHTTPHeaderValueHeaderKeyObjectRef(value, key, this.objectRef)
    }

    setHTTPBody(value: string | Data): void {
        if (typeof value === "string") {
            _XTFURLRequest.xtr_setHTTPBodyFromStringObjectRef(value, this.objectRef)
        }
        else if (value instanceof Data) {
            _XTFURLRequest.xtr_setHTTPBodyFromDataObjectRef(value.objectRef, this.objectRef)
        }
    }

    retain(): this {
        _XTRetain(this.objectRef)
        return this
    }

    release(): this {
        _XTRelease(this.objectRef)
        return this
    }

}