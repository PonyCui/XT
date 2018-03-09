/// <reference path="../xtf.d.ts" />
import { WebSocket as IWebSocket } from '../interface/WebSocket'
import { Data } from './Data';

/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

export class WebSocket extends XT.BaseObject {

    socket: any

    constructor(readonly url: string) {
        super(undefined, false)
        this.socket = new (window as any).WebSocket(url)
        this.socket.addEventListener('open', () => {
            this.onOpen && this.onOpen()
        })
        this.socket.addEventListener('close', (_: any, e: CloseEvent) => {
            this.onClose && this.onClose(e.code, e.reason)
        })
        this.socket.addEventListener('error', (_: any, e: ErrorEvent) => {
            this.onFail && this.onFail(new Error(e.message))
        })
        this.socket.addEventListener('message', (e: MessageEvent) => {
            if (e.data instanceof ArrayBuffer) {
                this.onMessage && this.onMessage(Data.initWithBytes(new Uint8Array(e.data)))
            }
            else if (typeof e.data === "string") {
                this.onMessage && this.onMessage(e.data)
            }
        })
    }

    onOpen?: () => void

    onClose?: (code: number, reason: string) => void

    onFail?: (error: Error) => void

    onMessage?: (message: Data | string) => void

    sendData(data: Data): void {
        this.socket.send(data.buffer)
    }

    sendString(string: string): void {
        this.socket.send(string)
    }

    close(): void {
        this.socket.close()
    }

}