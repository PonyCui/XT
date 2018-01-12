import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';

export class CustomView extends View {

    onMessage?: (message: string) => any = undefined

    constructor(className: string) {
        super(XTRCustomView)
        XTRCustomView.xtr_setClassName(className, this.objectRef)
    }

    public get props(): any {
        return XTRCustomView.xtr_props(this.objectRef) || {};
    }

    public set props(value: any) {
        XTRCustomView.xtr_setProps(value, this.objectRef);
    }

    emitMessage(message: any): any {
        return XTRCustomView.xtr_handleMessage(message, this.objectRef);
    }

    handleMessage(message: any): any {
        if (this.onMessage) {
            return this.onMessage(message);
        }
        return undefined
    }

}