import { View } from './View'
import { Rect } from "../../interface/Rect";
import * as PIXI from 'pixi.js'
import { Screen } from '../../interface/Screen';
import { Color } from '../../interface/Color';
import { TransformMatrix } from '../../interface/TransformMatrix';
import { setNeedsDisplay } from './Application'

class State {
    globalAlpha = 1;
    fillStyle?: Color = undefined
    strokeStyle?: Color = undefined
    lineCap?: string = undefined
    lineJoin?: string = undefined
    lineWidth = 1.0
    miterLimit = 0.0
    currentTransform: TransformMatrix = new TransformMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
}

export class CanvasView extends View {

    XTClassName = "CanvasView"

    public canvasGraphics: any;
    private currentPathActions: ((graphics: any) => void)[] = [];
    private currentState: State;
    private stateStack: State[] = []

    addContentLayers(): void {
        this.currentState = new State()
        this.canvasGraphics = new PIXI.Graphics();
        this.nativeObject.addChild(this.canvasGraphics);
    }

    public get globalAlpha(): number | undefined {
        return this.currentState.globalAlpha || 1.0
    }

    public set globalAlpha(value: number | undefined) {
        this.currentState.globalAlpha = value || 1.0
    }

    public get fillStyle(): Color | undefined {
        return this.currentState.fillStyle
    }

    public set fillStyle(value: Color | undefined) {
        this.currentState.fillStyle = value
    }

    public get strokeStyle(): Color | undefined {
        return this.currentState.strokeStyle
    }

    public set strokeStyle(value: Color | undefined) {
        this.currentState.strokeStyle = value
    }

    public get lineCap(): string | undefined {
        return this.currentState.lineCap
    }

    public set lineCap(value: string | undefined) {
        this.currentState.lineCap = value
    }

    public get lineJoin(): string | undefined {
        return this.currentState.lineJoin
    }

    public set lineJoin(value: string | undefined) {
        this.currentState.lineJoin = value
    }

    public get lineWidth(): number | undefined {
        return this.currentState.lineWidth || 1.0
    }

    public set lineWidth(value: number | undefined) {
        this.currentState.lineWidth = value || 1.0
    }

    public get miterLimit(): number | undefined {
        return this.currentState.miterLimit || 0.0
    }

    public set miterLimit(value: number | undefined) {
        this.currentState.miterLimit = value || 0.0
    }

    rect(x: number, y: number, width: number, height: number): void {
        this.currentPathActions = [];
        this.currentPathActions.push((graphics) => {
            graphics.drawRect(Screen.withScale(x), Screen.withScale(y), Screen.withScale(width), Screen.withScale(height))
        })
    }

    fillRect(x: number, y: number, width: number, height: number): void {
        this.rect(x, y, width, height);
        this.fill();
    }

    strokeRect(x: number, y: number, width: number, height: number): void {
        this.rect(x, y, width, height);
        this.stroke();
    }

    clearRect(x: number, y: number, width: number, height: number): void {
        console.error("clearRect not support not.")
    }

    fill() {
        this.canvasGraphics.beginFill((this.currentState.fillStyle || Color.blackColor).rgbHexNumber(), this.currentState.globalAlpha)
        this.currentPathActions.forEach(it => it(this.canvasGraphics));
        this.canvasGraphics.endFill();
    }

    stroke() {
        this.canvasGraphics.lineStyle(Screen.withScale(this.currentState.lineWidth), (this.currentState.strokeStyle || Color.blackColor).rgbHexNumber(), this.currentState.globalAlpha);
        this.currentPathActions.forEach(it => it(this.canvasGraphics));
        this.canvasGraphics.lineStyle(0)
    }

    beginPath(): void {
        this.currentPathActions = []
    }

    moveTo(x: number, y: number): void {
        this.currentPathActions.push((graphics) => {
            graphics.moveTo(Screen.withScale(x), Screen.withScale(y));
        })
    }

    closePath(): void {
        this.currentPathActions.push((graphics) => {
            graphics.closePath();
        })
    }

    lineTo(x: number, y: number): void {
        this.currentPathActions.push((graphics) => {
            graphics.lineTo(Screen.withScale(x), Screen.withScale(y));
        })
    }

    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void {
        this.currentPathActions.push((graphics) => {
            graphics.quadraticCurveTo(Screen.withScale(cpx), Screen.withScale(cpy), Screen.withScale(x), Screen.withScale(y));
        })
    }

    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
        this.currentPathActions.push((graphics) => {
            graphics.bezierCurveTo(Screen.withScale(cp1x), Screen.withScale(cp1y), Screen.withScale(cp2x), Screen.withScale(cp2y), Screen.withScale(x), Screen.withScale(y));
        })
    }

    arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise: boolean = false): void {
        this.currentPathActions.push((graphics) => {
            graphics.arc(Screen.withScale(x), Screen.withScale(y), Screen.withScale(r), sAngle, eAngle, counterclockwise);
        })
    }

    isPointInPath(x: number, y: number): boolean {
        let tmpGraphics = new PIXI.Graphics();
        tmpGraphics.beginFill(0x000000, 1.0)
        this.currentPathActions.forEach(it => it(tmpGraphics));
        tmpGraphics.endFill();
        return tmpGraphics.containsPoint(new PIXI.Point(Screen.withScale(x), Screen.withScale(y)))
    }

    setNeedsDisplay(): void {
        this.draw();
        setNeedsDisplay(this);
    }

    protected draw() {
        super.draw();
        this.canvasGraphics.clear();
        this.canvasGraphics.removeChildren();
        this.onDraw();
    }

    onDraw(): void { }

}