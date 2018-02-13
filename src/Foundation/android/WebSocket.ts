/// <reference path="../xtf.d.ts" />
import { WebSocket as IWebSocket } from '../interface/WebSocket'
import { Data } from './Data';

/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

export class WebSocket extends IWebSocket {

    objectRef: string

    constructor(url: string) {
        super(url)
        this.objectRef = _XTFWebSocket.create(url)
        objectRefs[this.objectRef] = this
    }

    onOpen?: () => void

    handleOpen() {
        this.onOpen && this.onOpen()
    }

    onClose?: (code: number, reason: string) => void

    handleClose(code: number, reason: string) {
        this.onClose && this.onClose(code, reason)
    }

    onFail?: (error: Error) => void

    handleFail(message: string) {
        this.onFail && this.onFail(new Error(message))
    }

    onMessage?: (message: Data | string) => void

    handleDataMessage(dataRef: string) {
        this.onMessage && this.onMessage(Data.initWithRef(dataRef))
    }

    handleStringMessage(value: string) {
        this.onMessage && this.onMessage(value)
    }

    sendData(data: Data): void {
        _XTFWebSocket.xtr_sendData(data.objectRef, this.objectRef)
    }

    sendString(string: string): void {
        _XTFWebSocket.xtr_sendString(string, this.objectRef)
    }

    close(): void {
        _XTFWebSocket.xtr_close(this.objectRef)
    }

    retain(owner: any = undefined): this {
        _XTRetain(this.objectRef, owner)
        return this
    }

    release(): this {
        _XTRelease(this.objectRef)
        return this
    }

}