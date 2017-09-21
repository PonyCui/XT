import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';
import { Color } from '../../interface/Color';

export class CanvasView extends View {

    nativeObject: any;

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        super(undefined, undefined, true);
        if (_isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.nativeObject = XTRCanvasView.createScriptObject(rect || RectZero, this);
            (window as any).XTRObjCreater.store(this);
            this.init();
        }
    }

    public get fillStyle(): Color | undefined {
        return this.nativeObject.xtr_fillStyle()
    }

    public set fillStyle(value: Color | undefined) {
        this.nativeObject.xtr_setFillStyle(value)
    }

    public get strokeStyle(): Color | undefined {
        return this.nativeObject.xtr_strokeStyle()
    }

    public set strokeStyle(value: Color | undefined) {
        this.nativeObject.xtr_setStrokeStyle(value)
    }

    public get lineCap(): string | undefined {
        return this.nativeObject.xtr_lineCap()
    }

    public set lineCap(value: string | undefined) {
        this.nativeObject.xtr_setLineCap(value)
    }

    public get lineJoin(): string | undefined {
        return this.nativeObject.xtr_lineJoin()
    }

    public set lineJoin(value: string | undefined) {
        this.nativeObject.xtr_setLineJoin(value)
    }

    public get lineWidth(): number | undefined {
        return this.nativeObject.xtr_lineWidth()
    }

    public set lineWidth(value: number | undefined) {
        this.nativeObject.xtr_setLineWidth(value)
    }

    public get miterLimit(): number | undefined {
        return this.nativeObject.xtr_miterLimit()
    }

    public set miterLimit(value: number | undefined) {
        this.nativeObject.xtr_setMiterLimit(value)
    }

    fillRect(x: number, y: number, width: number, height: number): void {
        this.nativeObject.xtr_fillRect({ x, y, width, height })
    }

    strokeRect(x: number, y: number, width: number, height: number): void {
        this.nativeObject.xtr_strokeRect({ x, y, width, height })
    }

    onDraw(): void { }

}

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.constructor.toString() === "[object XTRCanvasViewConstructor]") {
        return new CanvasView(undefined, view);
    }
    return undefined;
})