/// <reference path="../xtf.d.ts" />
import { Notification as INotification, NotificationCenter as INotificationCenter } from '../interface/Notification'

export class Notification extends INotification { }

export class NotificationCenter extends INotificationCenter {

    static default: NotificationCenter = new NotificationCenter()

    private observers: { handler: string, name: string, triggerBlock: (notification: Notification) => void }[] = []

    addObserver(name: string, triggerBlock: (notification: Notification) => void): string {
        const handler = performance.now().toString() + "-" + Math.random() + "-" + Math.random()
        this.observers.push({
            name,
            handler,
            triggerBlock,
        })
        return handler
    }

    removeObserver(handler: string): void {
        this.observers = this.observers.filter(it => it.handler !== handler)
    }

    postNotification(name: string, object: any, userInfo: { [key: string]: any }): void {
        this.onNotification(name, object, userInfo)
    }

    onNotification(name: string, object: any, userInfo: { [key: string]: any }): void {
        const notification = new Notification(name, object, userInfo)
        this.observers.forEach(it => {
            if (it.name === name) {
                it.triggerBlock(notification)
            }
        })
    }

}