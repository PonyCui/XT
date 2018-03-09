/// <reference path="../xtf.d.ts" />
/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

import { URLRequest as IURLRequest, URLCachePolily as IURLCachePolily } from '../interface/URLRequest'
import { Data } from './Data';

export const URLCachePolily = IURLCachePolily

export class URLRequest extends XT.BaseObject {

    private HTTPMethod: string = "GET"
    private HTTPBody: string | Data | undefined = undefined
    private HTTPHeaders: { [key: string]: string } = {}

    constructor(readonly url: string, readonly timeout = 15, readonly cachePolicy: IURLCachePolily = URLCachePolily.UseProtocolCachePolicy) {
        super(undefined, false);
    }

    buildRequest(): { request: XMLHttpRequest, body: string | Data | undefined } {
        const xmlRequest = new XMLHttpRequest()
        xmlRequest.timeout = this.timeout * 1000
        xmlRequest.responseType = "arraybuffer"
        xmlRequest.open(this.HTTPMethod, this.url, true)
        for (const key in this.HTTPHeaders) {
            if (this.HTTPHeaders.hasOwnProperty(key)) {
                xmlRequest.setRequestHeader(key, this.HTTPHeaders[key])
            }
        }
        return { request: xmlRequest, body: this.HTTPBody }
    }

    setHTTPMethod(value: "GET" | "POST" | "PUT" | "DELETE"): void {
        this.HTTPMethod = value
    }

    setHTTPHeader(value: string, key: string): void {
        this.HTTPHeaders[key] = value
    }

    setHTTPBody(value: string | Data): void {
        this.HTTPBody = value
    }

    retain(): this {
        return this
    }

    release(): this {
        return this
    }

}