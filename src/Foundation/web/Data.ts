/// <reference path="../xtf.d.ts" />
import { Data as IData } from '../interface/Data'
declare var SparkMD5: any;
declare var sha1: any;
declare var unescape: any;
declare var escape: any;
declare var TextEncoder: any;
declare var TextDecoder: any;

export class Data extends XT.BaseObject {

    static initWithString(value: string): Data {
        if (typeof TextEncoder === "function") {
            return new Data(new TextEncoder().encode(value).buffer)
        }
        else {
            var trimValue = unescape(encodeURIComponent(value))
            var arrayBuffer = new ArrayBuffer(trimValue.length);
            var bufferView = new Uint8Array(arrayBuffer);
            for (var i = 0, count = trimValue.length; i < count; i++) {
                bufferView[i] = trimValue.charCodeAt(i);
            }
            return new Data(arrayBuffer)
        }
    }

    static initWithBytes(bytes: Uint8Array): Data {
        return new Data(bytes.buffer)
    }

    static initWithData(data: Data): Data {
        return new Data(data.buffer.slice(0))
    }

    static initWithBase64EncodedString(string: string): Data | undefined {
        var binaryString = window.atob(string);
        var len = binaryString.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new Data(bytes.buffer);
    }

    static initWithBase64EncodedData(data: Data): Data | undefined {
        return this.initWithBase64EncodedString(String.fromCharCode.apply(null, new Uint8Array(data.buffer)))
    }

    protected constructor(readonly buffer: ArrayBuffer) { super(undefined, false) }

    isEqualTo(data: Data): boolean {
        const b1 = new Uint8Array(this.buffer)
        const b2 = new Uint8Array(data.buffer)
        return b1.length == b2.length && this.every(b1, (v, i) => v === b2[i])
    }

    private every(array: Uint8Array, callback: (v: any, i: number) => boolean): boolean {
        if (typeof array.every === "function") {
            return array.every(callback)
        }
        else {
            for (let index = 0; index < array.length; index++) {
                if (!callback(array[index], index)) {
                    return false
                }
            }
            return true
        }
    }

    length(): number {
        return this.buffer.byteLength
    }

    getBytes(): Uint8Array {
        return Uint8Array.from(_XTFData.getBytes(this.objectRef))
    }

    base64EncodedString(): string {
        return window.btoa(String.fromCharCode.apply(null, new Uint8Array(this.buffer)));
    }

    base64EncodedData(): Data {
        return Data.initWithString(this.base64EncodedString())
    }

    utf8String(): string | undefined {
        if (typeof TextDecoder === "function") {
            return new TextDecoder().decode(this.buffer)
        }
        return decodeURIComponent(escape(String.fromCharCode.apply(null, new Uint8Array(this.buffer))))
    }

    md5(): string {
        if (typeof SparkMD5 === "undefined") {
            console.error("Please add <script src='https://cdn.jsdelivr.net/npm/spark-md5@3.0.0/spark-md5.min.js'></script> to HTML");
            return "";
        }
        return (SparkMD5.ArrayBuffer.hash(this.buffer) as String).toUpperCase()
    }

    sha1(): string {
        if (typeof sha1 === "undefined") {
            console.error("Please add <script src='https://cdn.jsdelivr.net/npm/js-sha1@0.6.0/build/sha1.min.js'></script> to HTML");
            return "";
        }
        return (sha1(new Uint8Array(this.buffer)) as String).toUpperCase();
    }

}