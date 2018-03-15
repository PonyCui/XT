/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

export class Data extends XT.BaseObject {

    static initWithString(value: string): Data { throw Error("Not implemented.") }
    static initWithBytes(bytes: Uint8Array): Data { throw Error("Not implemented.") }
    static initWithData(data: Data): Data { throw Error("Not implemented.") }
    static initWithBase64EncodedString(string: string): Data | undefined { throw Error("Not implemented.") }
    static initWithBase64EncodedData(data: Data): Data | undefined { throw Error("Not implemented.") }

    protected constructor() { super() }
    isEqualTo(data: Data): boolean { throw Error("Not implemented.") }
    length(): number { throw Error("Not implemented.") }
    getBytes(): Uint8Array { throw Error("Not implemented.") }
    base64EncodedString(): string { throw Error("Not implemented.") }
    base64EncodedData(): Data { throw Error("Not implemented.") }
    utf8String(): string | undefined { throw Error("Not implemented.") }
    md5(): string { throw Error("Not implemented.") }
    sha1(): string { throw Error("Not implemented.") }

}