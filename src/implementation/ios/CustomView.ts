import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';

export class CustomView extends View {

    onMessage?: (message: string) => any = undefined

    constructor(ref: any, className: string) {
        super(ref || XTRCustomView.create, className)
    }

    emitMessage(message: any): any {
        return XTRCustomView.handleMessageObjectRef(message, this.objectRef);
    }

    handleMessage(message: any): any {
        if (this.onMessage) {
            return this.onMessage(message);
        }
        return undefined
    }

}