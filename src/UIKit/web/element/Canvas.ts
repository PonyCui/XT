import { ViewElement } from "./View";
import { Rect } from "../../interface/Rect";
import { Color } from "../../interface/Color";
import { TransformMatrix } from "../../interface/TransformMatrix";
const d3 = require('d3-path')

class State {

    globalAlpha = 1.0
    fillStyle: Color = new Color(0, 0, 0, 0)
    strokeStyle: Color = new Color(0, 0, 0, 0)
    lineCap: string = "butt"
    lineJoin: string = "miter"
    lineWidth: number = 1.0
    miterLimit: number = 0.0
    currentTransform: TransformMatrix = new TransformMatrix()

    copy() {
        const state: any = new State()
        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                state[key] = this[key]
            }
        }
        return state
    }

}

export class CanvasElement extends ViewElement {

    private stateStack: State[] = [new State()]

    private get currentState(): State {
        return this.stateStack[this.stateStack.length - 1]
    }

    private canvasElement: SVGGElement
    private canvasObject: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private actions: (() => void)[] = []

    loadContent() {
        super.loadContent();
        this.canvasElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.canvasElement.style.width = "100%"
        this.canvasElement.style.height = "100%"
        this.canvasObject = document.createElement("canvas");
        this.ctx = this.canvasObject.getContext('2d') as CanvasRenderingContext2D
        this.nativeObject.appendChild(this.canvasElement)
    }

    public xtr_globalAlpha(): number {
        return this.currentState.globalAlpha
    }

    public xtr_setGlobalAlpha(value: number) {
        this.currentState.globalAlpha = value
    }

    public xtr_fillStyle(): Color {
        return this.currentState.fillStyle
    }

    public xtr_setFillStyle(value: Color) {
        this.currentState.fillStyle = value
    }

    public xtr_strokeStyle(): Color {
        return this.currentState.strokeStyle
    }

    public xtr_setStrokeStyle(value: Color) {
        this.currentState.strokeStyle = value;
    }

    public xtr_lineCap(): string {
        return this.currentState.lineCap
    }

    public xtr_setLineCap(value: string) {
        this.currentState.lineCap = value
    }

    public xtr_lineJoin(): string {
        return this.currentState.lineJoin
    }

    public xtr_setLineJoin(value: string) {
        this.currentState.lineJoin = value
    }

    public xtr_lineWidth(): number {
        return this.currentState.lineWidth
    }

    public xtr_setLineWidth(value: number) {
        this.currentState.lineWidth = value
    }

    public xtr_miterLimit(): number {
        return this.currentState.miterLimit
    }

    public xtr_setMiterLimit(value: number) {
        this.currentState.miterLimit = value
    }

    private currentElement?: Element = undefined

    public xtr_rect(rect: { x: number, y: number, width: number, height: number }): void {
        this.ctx.rect(rect.x, rect.y, rect.width, rect.height)
        this.currentElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.currentElement.setAttribute("fill", 'transparent')
        this.currentElement.setAttribute("x", rect.x.toString())
        this.currentElement.setAttribute("y", rect.y.toString())
        this.currentElement.setAttribute("width", rect.width.toString())
        this.currentElement.setAttribute("height", rect.height.toString())
        this.canvasElement.appendChild(this.currentElement)
    }

    public xtr_fillRect(rect: { x: number, y: number, width: number, height: number }): void {
        this.xtr_rect(rect)
        this.xtr_fill()
    }

    public xtr_strokeRect(rect: { x: number, y: number, width: number, height: number }): void {
        this.xtr_rect(rect)
        this.xtr_stroke()
    }

    public xtr_fill() {
        if (this.currentElement) {
            this.currentElement.setAttribute("opacity", this.currentState.globalAlpha.toString())
            this.currentElement.setAttribute("fill", 'rgba(' + (this.currentState.fillStyle.r * 255).toFixed(0) + ', ' + (this.currentState.fillStyle.g * 255).toFixed(0) + ', ' + (this.currentState.fillStyle.b * 255).toFixed(0) + ', ' + this.currentState.fillStyle.a.toString() + ')')
            this.currentElement.setAttribute("transform", 'matrix(' + this.currentState.currentTransform.a + ',' + this.currentState.currentTransform.b + ',' + this.currentState.currentTransform.c + ',' + this.currentState.currentTransform.d + ',' + this.currentState.currentTransform.tx + ',' + this.currentState.currentTransform.ty + ')');
        }
    }

    public xtr_stroke() {
        if (this.currentElement) {
            this.currentElement.setAttribute("opacity", this.currentState.globalAlpha.toString())
            this.currentElement.setAttribute("stroke", 'rgba(' + (this.currentState.strokeStyle.r * 255).toFixed(0) + ', ' + (this.currentState.strokeStyle.g * 255).toFixed(0) + ', ' + (this.currentState.strokeStyle.b * 255).toFixed(0) + ', ' + this.currentState.strokeStyle.a.toString() + ')')
            this.currentElement.setAttribute("stroke-width", this.currentState.lineWidth.toString())
            this.currentElement.setAttribute("stroke-linecap", this.currentState.lineCap)
            this.currentElement.setAttribute("stroke-linejoin", this.currentState.lineJoin)
            this.currentElement.setAttribute("stroke-miterlimit", this.currentState.miterLimit.toString())
            this.currentElement.setAttribute("transform", 'matrix(' + this.currentState.currentTransform.a + ',' + this.currentState.currentTransform.b + ',' + this.currentState.currentTransform.c + ',' + this.currentState.currentTransform.d + ',' + this.currentState.currentTransform.tx + ',' + this.currentState.currentTransform.ty + ')');
        }
    }

    private d3Path = d3.path()

    private updatePath() {
        if (this.currentElement) {
            this.currentElement.setAttribute('d', this.d3Path.toString())
        }
    }

    public xtr_beginPath(): void {
        this.currentElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.currentElement.setAttribute("fill", 'transparent')
        this.canvasElement.appendChild(this.currentElement)
        this.ctx.beginPath()
        this.d3Path = d3.path()
    }

    public xtr_moveTo(point: { x: number, y: number }): void {
        this.ctx.moveTo(point.x, point.y);
        this.d3Path.moveTo(point.x, point.y);
        this.updatePath()
    }

    public xtr_closePath(): void {
        this.ctx.closePath()
        this.d3Path.closePath();
        this.updatePath()
    }

    public xtr_lineTo(point: { x: number, y: number }): void {
        this.ctx.lineTo(point.x, point.y)
        this.d3Path.lineTo(point.x, point.y);
        this.updatePath()
    }

    public xtr_quadraticCurveTo(cpPoint: { x: number, y: number }, point: { x: number, y: number }): void {
        this.ctx.quadraticCurveTo(cpPoint.x, cpPoint.y, point.x, point.y)
        this.d3Path.quadraticCurveTo(cpPoint.x, cpPoint.y, point.x, point.y);
        this.updatePath()
    }

    public xtr_bezierCurveTo(cp1Point: { x: number, y: number }, cp2Point: { x: number, y: number }, point: { x: number, y: number }): void {
        this.ctx.bezierCurveTo(cp1Point.x, cp1Point.y, cp2Point.x, cp2Point.y, point.x, point.y)
        this.d3Path.bezierCurveTo(cp1Point.x, cp1Point.y, cp2Point.x, cp2Point.y, point.x, point.y);
        this.updatePath()
    }

    public xtr_arc(point: { x: number, y: number }, r: number, sAngle: number, eAngle: number, counterclockwise: boolean = false): void {
        this.ctx.arc(point.x, point.y, r, sAngle, eAngle, counterclockwise)
        this.d3Path.moveTo(point.x + r, point.y)
        this.d3Path.arc(point.x, point.y, r, sAngle, eAngle, counterclockwise);
        this.updatePath()
    }

    public xtr_postScale(point: { x: number, y: number }): void {
        this.currentState.currentTransform = this.currentState.currentTransform.postScale(point.x, point.y)
    }

    public xtr_postRotate(angle: number) {
        this.currentState.currentTransform = this.currentState.currentTransform.postRotate(angle)
    }

    public xtr_postTranslate(point: { x: number, y: number }): void {
        this.currentState.currentTransform = this.currentState.currentTransform.postTranslate(point.x, point.y)
    }

    public xtr_postTransform(t: { a: number, b: number, c: number, d: number, tx: number, ty: number }): void {
        this.currentState.currentTransform = this.currentState.currentTransform.concat(new TransformMatrix(t.a, t.b, t.c, t.d, t.tx, t.ty))
    }

    public xtr_setCanvasTransform(t: { a: number, b: number, c: number, d: number, tx: number, ty: number }): void {
        this.currentState.currentTransform = new TransformMatrix(t.a, t.b, t.c, t.d, t.tx, t.ty)
    }

    public xtr_save(): void {
        this.stateStack.push(this.currentState.copy())
    }

    public xtr_restore(): void {
        this.stateStack.pop()
    }

    public xtr_isPointInPath(point: { x: number, y: number }): boolean {
        return this.ctx.isPointInPath(point.x, point.y)
    }

    public xtr_clear(): void {
        this.canvasElement.innerHTML = ""
    }

}