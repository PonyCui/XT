import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';
import { CustomViewElement } from './element/CustomView';

export class CustomView extends View {

    onMessage?: (message: string) => any = undefined

    nativeObject: any;

    constructor(className: string, rect?: Rect, _isChild: boolean = false) {
        super(undefined, true)
        if (_isChild) { return; }
        this.nativeObject = new CustomViewElement(className, rect || RectZero, this);
        this.userInteractionEnabled = true
        setImmediate(() => { this.init(); });
    }

    public get props(): any {
        return this.nativeObject.xtr_props() || {};
    }

    public set props(value: any) {
        this.nativeObject.xtr_setProps(value);
    }

    emitMessage(message: any): any {
        return this.nativeObject.xtr_handleMessage(message);
    }

    handleMessage(message: any): any {
        if (this.onMessage) {
            return this.onMessage(message);
        }
        return undefined
    }

}