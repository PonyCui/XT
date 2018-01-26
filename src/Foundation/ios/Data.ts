/// <reference path="../xtf.d.ts" />
import { Data as IData } from '../interface/Data'

export class Data extends IData {

    retain(): this {
        _XTRetain(this.objectRef)
        return this
    }

    release(): this {
        _XTRelease(this.objectRef)
        return this
    }

    static initWithString(value: string): Data {
        return Data.initWithRef(_XTFData.createWithString(value))
    }

    static initWithRef(objectRef: string): Data {
        const obj = new Data();
        obj.objectRef = objectRef;
        return obj
    }

    static initWithBytes(bytes: Uint8Array): Data {
        return Data.initWithRef(_XTFData.createWithBytes(bytes))
    }

    static initWithData(data: Data): Data {
        return Data.initWithRef(_XTFData.createWithData(data.objectRef))
    }

    static initWithBase64EncodedString(string: string): Data | undefined {
        const ref = _XTFData.createWithBase64EncodedString(string)
        return typeof ref === "string" ? Data.initWithRef(ref) : undefined
    }

    static initWithBase64EncodedData(data: Data): Data | undefined {
        const ref = _XTFData.createWithBase64EncodedData(data.objectRef)
        return typeof ref === "string" ? Data.initWithRef(ref) : undefined
    }

    protected constructor() { super() }

    isEqualTo(data: Data): boolean {
        return _XTFData.isEqualToObjectRef(data.objectRef, this.objectRef)
    }

    length(): number {
        return _XTFData.length(this.objectRef)
    }

    getBytes(): Uint8Array {
        return Uint8Array.from(_XTFData.getBytes(this.objectRef))
    }

    base64EncodedString(): string {
        return _XTFData.base64EncodedString(this.objectRef);
    }

    base64EncodedData(): Data {
        return Data.initWithRef(_XTFData.base64EncodedData(this.objectRef));
    }

    utf8String(): string | undefined {
        const value = _XTFData.utf8String(this.objectRef);
        return typeof value === "string" ? value : undefined
    }

    md5(): string {
        return _XTFData.md5(this.objectRef)
    }

    sha1(): string {
        return _XTFData.sha1(this.objectRef)
    }

}