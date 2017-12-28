import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';

export class CustomView extends View {

    onMessage?: (message: string) => any = undefined

    constructor(className: string, rect?: Rect, _isChild: boolean = false) {
        super(undefined, true);
        if (_isChild) { return; }
        this.objectRef = XTRCustomView.createFrameScriptObject(className, rect || RectZero, this);
        objectRefs[this.objectRef] = this;
        setImmediate(() => { this.init(); });
    }

    emitMessage(message: any): any {
        return this.nativeObject.handleMessage(message);
    }

    handleMessage(message: any): any {
        if (this.onMessage) {
            return this.onMessage(message);
        }
        return undefined
    }

}