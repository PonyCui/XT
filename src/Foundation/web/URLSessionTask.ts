/// <reference path="../xtf.d.ts" />
/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

import { URLSessionTask as IURLSessionTask } from '../interface/URLSessionTask'
import { Data } from './Data';
import { URLResponse } from './URLResponse';

export class URLSessionTask extends XT.BaseObject {

    constructor(
        readonly xmlReuqest: XMLHttpRequest,
        readonly body: string | Data | undefined,
        readonly completionHandler: (data?: Data, response?: URLResponse, error?: Error) => void) {
        super(undefined, false)
    }

    cancel(): void {
        this.xmlReuqest.abort()
    }

    resume(): void {
        this.xmlReuqest.addEventListener("loadend", () => {
            const data: Data | undefined = this.xmlReuqest.response instanceof ArrayBuffer ? Data.initWithBytes(new Uint8Array(this.xmlReuqest.response)) : undefined
            const response = new URLResponse(this.xmlReuqest)
            this.completionHandler(data, response, undefined)
        })
        this.xmlReuqest.addEventListener("error", ((_: any, e: ErrorEvent) => {
            this.completionHandler(undefined, undefined, e.error)
        }) as any)
        if (this.body instanceof Data) {
            this.xmlReuqest.send(this.body.buffer)
        }
        else if (typeof this.body === "string") {
            this.xmlReuqest.send(this.body)
        }
        else {
            this.xmlReuqest.send()
        }
    }

}
