export class Notification {

    constructor(readonly name: string, readonly object: any, readonly userInfo: { [key: string]: any }) { }

}

export class NotificationCenter {

    static default: NotificationCenter
    protected constructor() { }
    addObserver(name: string, triggerBlock: (notification: Notification) => void): string { throw "Not implemented." }
    removeObserver(handler: string): void { throw "Not implemented." }
    postNotification(name: string, object: any, userInfo: { [key: string]: any }): void { throw "Not implemented." }

}