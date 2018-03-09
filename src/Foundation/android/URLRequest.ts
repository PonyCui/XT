/// <reference path="../xtf.d.ts" />
/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

import { URLRequest as IURLRequest, URLCachePolily as IURLCachePolily } from '../interface/URLRequest'
import { Data } from './Data';

export const URLCachePolily = IURLCachePolily

export class URLRequest extends XT.BaseObject {

    readonly url: string
    readonly timeout: number
    readonly cachePolicy: number
    readonly objectRef: any

    constructor(url: string, timeout = 15, cachePolicy: IURLCachePolily = URLCachePolily.UseProtocolCachePolicy) {
        super(undefined, false);
        this.url = url
        this.timeout = timeout
        this.cachePolicy = cachePolicy
        this.objectRef = _XTFURLRequest.create(url, timeout, cachePolicy);
    }

    setHTTPMethod(value: "GET" | "POST" | "PUT" | "DELETE"): void {
        _XTFURLRequest.xtr_setHTTPMethod(value, this.objectRef)
    }

    setHTTPHeader(value: string, key: string): void {
        _XTFURLRequest.xtr_setHTTPHeader(value, key, this.objectRef)
    }

    setHTTPBody(value: string | Data): void {
        if (typeof value === "string") {
            _XTFURLRequest.xtr_setHTTPBodyFromString(value, this.objectRef)
        }
        else if (value instanceof Data) {
            _XTFURLRequest.xtr_setHTTPBodyFromData(value.objectRef, this.objectRef)
        }
    }

}