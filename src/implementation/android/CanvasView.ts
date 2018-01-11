import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';
import { Color } from '../../interface/Color';

export class CanvasView extends View {

    constructor() {
        super(XTRCanvasView)
    }

    public get globalAlpha(): number {
        return XTRCanvasView.xtr_globalAlpha(this.objectRef)
    }

    public set globalAlpha(value: number) {
        XTRCanvasView.xtr_setGlobalAlpha(value, this.objectRef)
    }

    public get fillStyle(): Color {
        return XTRCanvasView.xtr_fillStyle(this.objectRef)
    }

    public set fillStyle(value: Color) {
        XTRCanvasView.xtr_setFillStyle(value, this.objectRef)
    }

    public get strokeStyle(): Color {
        return XTRCanvasView.xtr_strokeStyle(this.objectRef)
    }

    public set strokeStyle(value: Color) {
        XTRCanvasView.xtr_setStrokeStyle(value, this.objectRef)
    }

    public get lineCap(): string {
        return XTRCanvasView.xtr_lineCap(this.objectRef)
    }

    public set lineCap(value: string) {
        XTRCanvasView.xtr_setLineCap(value, this.objectRef)
    }

    public get lineJoin(): string {
        return XTRCanvasView.xtr_lineJoin(this.objectRef)
    }

    public set lineJoin(value: string) {
        XTRCanvasView.xtr_setLineJoin(value, this.objectRef)
    }

    public get lineWidth(): number {
        return XTRCanvasView.xtr_lineWidth(this.objectRef)
    }

    public set lineWidth(value: number) {
        XTRCanvasView.xtr_setLineWidth(value, this.objectRef)
    }

    public get miterLimit(): number {
        return XTRCanvasView.xtr_miterLimit(this.objectRef)
    }

    public set miterLimit(value: number) {
        XTRCanvasView.xtr_setMiterLimit(value, this.objectRef)
    }

    rect(x: number, y: number, width: number, height: number): void {
        XTRCanvasView.xtr_rect({ x, y, width, height }, this.objectRef)
    }

    fillRect(x: number, y: number, width: number, height: number): void {
        XTRCanvasView.xtr_fillRect({ x, y, width, height }, this.objectRef)
    }

    strokeRect(x: number, y: number, width: number, height: number): void {
        XTRCanvasView.xtr_strokeRect({ x, y, width, height }, this.objectRef)
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
        XTRCanvasView.xtr_moveTo({ x, y }, this.objectRef);
    }

    closePath(): void {
        XTRCanvasView.xtr_closePath(this.objectRef)
    }

    lineTo(x: number, y: number): void {
        XTRCanvasView.xtr_lineTo({ x, y }, this.objectRef)
    }

    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void {
        XTRCanvasView.xtr_quadraticCurveTo({ x: cpx, y: cpy }, { x, y }, this.objectRef)
    }

    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
        XTRCanvasView.xtr_bezierCurveTo({ x: cp1x, y: cp1y }, { x: cp2x, y: cp2y }, { x, y }, this.objectRef)
    }

    arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise: boolean = false): void {
        XTRCanvasView.xtr_arc({ x, y }, r, sAngle, eAngle, counterclockwise, this.objectRef)
    }

    postScale(x: number, y: number): void {
        XTRCanvasView.xtr_postScale({ x, y }, this.objectRef)
    }

    postRotate(angle: number) {
        XTRCanvasView.xtr_postRotate(angle, this.objectRef);
    }

    postTranslate(x: number, y: number): void {
        XTRCanvasView.xtr_postTranslate({ x, y }, this.objectRef)
    }

    postTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void {
        XTRCanvasView.xtr_postTransform({ a, b, c, d, tx, ty }, this.objectRef)
    }

    setTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void {
        XTRCanvasView.xtr_setCanvasTransform({ a, b, c, d, tx, ty }, this.objectRef)
    }

    save(): void {
        XTRCanvasView.xtr_save(this.objectRef);
    }

    restore(): void {
        XTRCanvasView.xtr_restore(this.objectRef);
    }

    isPointInPath(x: number, y: number): boolean {
        return XTRCanvasView.xtr_isPointInPath({ x, y }, this.objectRef)
    }

    clear(): void {
        XTRCanvasView.xtr_clear(this.objectRef);
    }

}