import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';

export class CustomView extends View {

    onMessage?: (message: string) => void = undefined

    constructor(className: string, rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        super(undefined, undefined, true);
        if (_isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.nativeObject = XTRCustomView.createFrameScriptObject(className, rect || RectZero, this);
            (window as any).XTRObjCreater.store(this);
            setImmediate(() => { this.init(); });
        }
    }

    emitMessage(message: any) {
        this.nativeObject.handleMessage(message);
    }

    handleMessage(message: any) {
        this.onMessage && this.onMessage(message);
    }

}

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.constructor.toString() === "[object XTRCustomViewConstructor]") {
        return new CustomView("", undefined, view);
    }
    return undefined;
})