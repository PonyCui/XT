import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';

export class CustomView extends View {

    onMessage?: (message: string) => any = undefined

    constructor(className: string, rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        super(undefined, undefined, true);
        if (_isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.nativeObject = XTRCustomView.createScriptObject(className, rect || RectZero, this);
            (window as any).XTRObjCreater.store(this);
            setImmediate(() => { this.init(); });
        }
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

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.constructor.toString() === "com.opensource.xtruntime.XTRCustomView$InnerObject") {
        return new CustomView("", undefined, view);
    }
    return undefined;
})