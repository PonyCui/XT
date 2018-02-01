/// <reference path="../xtf.d.ts" />
/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */
import { URLResponse as IURLResponse } from '../interface/URLResponse'

export class URLResponse extends IURLResponse {

    constructor(readonly req: XMLHttpRequest) {
        super()
    }

    public get expectedContentLength(): number {
        return parseInt(this.req.getResponseHeader('Content-Type') || "0")
    }

    public get suggestedFilename(): string {
        const contentType = this.req.getResponseHeader('Content-Disposition') || "Unknown"
        return contentType.indexOf("filename=") >= 0 ? (contentType.split("filename=").pop() as string).replace(/\"/, "").trim() : "Unknown"
    }

    public get mimeType(): string {
        const contentType = this.req.getResponseHeader('Content-Type') || ""
        return contentType.indexOf(";") >= 0 ? (contentType.split(";")[0] as string).trim() : contentType.trim()
    }

    public get textEncodingName(): string {
        const contentType = this.req.getResponseHeader('Content-Type') || ""
        return contentType.indexOf("charset=") >= 0 ? (contentType.split("charset=").pop() as string).trim() : "UTF-8"
    }

    public get url(): string {
        return this.req.responseURL
    }

    public get allHeaderFields(): { [key: string]: any } {
        let result: any = {}
        const plainText = this.req.getAllResponseHeaders()
        plainText.split("\n").forEach((it) => {
            const sIndex = it.indexOf(": ")
            if (sIndex >= 0) {
                const headerKey = it.substring(0, sIndex).replace(/\b[a-z]/g,function(f){return f.toUpperCase();}).trim()
                const headerValue = it.substring(sIndex + 2).trim()
                result[headerKey] = headerValue
            }
        })
        return result
    }

    public get statusCode(): number {
        return this.req.status
    }

}