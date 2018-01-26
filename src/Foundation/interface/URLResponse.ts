/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */
export class URLResponse {
    
    expectedContentLength: number
    suggestedFilename?: string
    mimeType?: string
    textEncodingName?: string
    url?: string
    allHeaderFields: {[key: string]: any}
    statusCode: number

}