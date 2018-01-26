import { Data } from './Data';
import { Releasable } from './Releasable';

/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

export class WebSocket implements Releasable {

    retain(): this {
        throw new Error("Method not implemented.");
    }
    release(): this {
        throw new Error("Method not implemented.");
    }

    constructor(url: string) { }
    onOpen?: () => void
    onClose?: (code: number, reason: string) => void
    onFail?: (error: Error) => void
    onMessage?: (message: Data | string) => void
    sendData(data: Data): void { }
    sendString(string: string): void { }
    close(): void { }

}