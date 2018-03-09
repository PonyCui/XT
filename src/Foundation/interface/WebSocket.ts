import { Data } from './Data';

/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

export class WebSocket extends XT.BaseObject {

    constructor(url: string) { super() }
    onOpen?: () => void
    onClose?: (code: number, reason: string) => void
    onFail?: (error: Error) => void
    onMessage?: (message: Data | string) => void
    sendData(data: Data): void { }
    sendString(string: string): void { }
    close(): void { }

}