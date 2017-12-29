import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';
import { Color } from '../../interface/Color';

export class CanvasView extends View {

    constructor(ref: any) {
        super(ref || XTRCanvasView)
    }

    public get globalAlpha(): number | undefined {
        return XTRCanvasView.xtr_globalAlpha(this.objectRef)
    }

    public set globalAlpha(value: number | undefined) {
        XTRCanvasView.xtr_setGlobalAlphaObjectRef(value, this.objectRef)
    }

    public get fillStyle(): Color | undefined {
        return XTRCanvasView.xtr_fillStyle(this.objectRef)
    }

    public set fillStyle(value: Color | undefined) {
        XTRCanvasView.xtr_setFillStyleObjectRef(value, this.objectRef)
    }

    public get strokeStyle(): Color | undefined {
        return XTRCanvasView.xtr_strokeStyle(this.objectRef)
    }

    public set strokeStyle(value: Color | undefined) {
        XTRCanvasView.xtr_setStrokeStyleObjectRef(value, this.objectRef)
    }

    public get lineCap(): string | undefined {
        return XTRCanvasView.xtr_lineCap(this.objectRef)
    }

    public set lineCap(value: string | undefined) {
        XTRCanvasView.xtr_setLineCapObjectRef(value, this.objectRef)
    }

    public get lineJoin(): string | undefined {
        return XTRCanvasView.xtr_lineJoin(this.objectRef)
    }

    public set lineJoin(value: string | undefined) {
        XTRCanvasView.xtr_setLineJoinObjectRef(value, this.objectRef)
    }

    public get lineWidth(): number | undefined {
        return XTRCanvasView.xtr_lineWidth(this.objectRef)
    }

    public set lineWidth(value: number | undefined) {
        XTRCanvasView.xtr_setLineWidthObjectRef(value, this.objectRef)
    }

    public get miterLimit(): number | undefined {
        return XTRCanvasView.xtr_miterLimit(this.objectRef)
    }

    public set miterLimit(value: number | undefined) {
        XTRCanvasView.xtr_setMiterLimitObjectRef(value, this.objectRef)
    }

    rect(x: number, y: number, width: number, height: number): void {
        XTRCanvasView.xtr_rectObjectRef({ x, y, width, height }, this.objectRef)
    }

    fillRect(x: number, y: number, width: number, height: number): void {
        XTRCanvasView.xtr_fillRectObjectRef({ x, y, width, height }, this.objectRef)
    }

    strokeRect(x: number, y: number, width: number, height: number): void {
        XTRCanvasView.xtr_strokeRectObjectRef({ x, y, width, height }, this.objectRef)
    }

    fill() {
        XTRCanvasView.xtr_fill(this.objectRef);
    }

    stroke() {
        XTRCanvasView.xtr_stroke(this.objectRef);
    }

    beginPath(): void {
        XTRCanvasView.xtr_beginPath(this.objectRef);
    }

    moveTo(x: number, y: number): void {
        XTRCanvasView.xtr_moveToObjectRef({ x, y }, this.objectRef);
    }

    closePath(): void {
        XTRCanvasView.xtr_closePath(this.objectRef)
    }

    lineTo(x: number, y: number): void {
        XTRCanvasView.xtr_lineToObjectRef({ x, y }, this.objectRef)
    }

    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void {
        XTRCanvasView.xtr_quadraticCurveToXyPointObjectRef({ x: cpx, y: cpy }, { x, y }, this.objectRef)
    }

    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
        XTRCanvasView.xtr_bezierCurveToCp2PointXyPointObjectRef({ x: cp1x, y: cp1y }, { x: cp2x, y: cp2y }, { x, y }, this.objectRef)
    }

    arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise: boolean = false): void {
        XTRCanvasView.xtr_arcRSAngleEAngleCounterclockwiseObjectRef({ x, y }, r, sAngle, eAngle, counterclockwise, this.objectRef)
    }

    postScale(x: number, y: number): void {
        XTRCanvasView.xtr_postScaleObjectRef({ x, y }, this.objectRef)
    }

    postRotate(angle: number) {
        XTRCanvasView.xtr_postRotateObjectRef(angle, this.objectRef);
    }

    postTranslate(x: number, y: number): void {
        XTRCanvasView.xtr_postTranslateObjectRef({ x, y }, this.objectRef)
    }

    postTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void {
        XTRCanvasView.xtr_postTransformObjectRef({ a, b, c, d, tx, ty }, this.objectRef)
    }

    setTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void {
        XTRCanvasView.xtr_setCanvasTransformObjectRef({ a, b, c, d, tx, ty }, this.objectRef)
    }

    save(): void {
        XTRCanvasView.xtr_save(this.objectRef);
    }
    
    restore(): void {
        XTRCanvasView.xtr_restore(this.objectRef);
    }

    isPointInPath(x: number, y: number): boolean {
        return XTRCanvasView.xtr_isPointInPathObjectRef({ x, y }, this.objectRef)
    }

    clear(): void {
        XTRCanvasView.xtr_clear(this.objectRef);
    }

}