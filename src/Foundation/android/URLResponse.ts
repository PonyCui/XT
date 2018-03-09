/// <reference path="../xtf.d.ts" />
/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */
import { URLResponse as IURLResponse } from '../interface/URLResponse'

export class URLResponse extends XT.BaseObject {

    constructor(objectRef: any) {
        super(undefined, false)
        this.objectRef = objectRef
    }

    public get expectedContentLength(): number {
        return _XTFURLResponse.xtr_expectedContentLength(this.objectRef)
    }

    public get suggestedFilename(): string {
        return _XTFURLResponse.xtr_suggestedFilename(this.objectRef)
    }

    public get mimeType(): string {
        return _XTFURLResponse.xtr_mimeType(this.objectRef)
    }

    public get textEncodingName(): string {
        return _XTFURLResponse.xtr_textEncodingName(this.objectRef)
    }

    public get url(): string {
        return _XTFURLResponse.xtr_URLString(this.objectRef)
    }

    public get allHeaderFields(): { [key: string]: any } {
        return _XTFURLResponse.xtr_allHeaderFields(this.objectRef)
    }

    public get statusCode(): number {
        return _XTFURLResponse.xtr_statusCode(this.objectRef)
    }


}