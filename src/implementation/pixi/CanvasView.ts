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
    currentTransform?: TransformMatrix = undefined
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
            graphics.drawRect(x, y, width, height)
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
        const graphics = new PIXI.Graphics();
        if (this.currentState.currentTransform) {
            const matrix = new PIXI.Matrix();
            matrix.fromArray([this.currentState.currentTransform.a, this.currentState.currentTransform.b, this.currentState.currentTransform.tx, this.currentState.currentTransform.c, this.currentState.currentTransform.d, this.currentState.currentTransform.ty]);
            matrix.scale(Screen.withScale(1), Screen.withScale(1))
            graphics.transform.setFromMatrix(matrix);
        }
        else {
            const matrix = new PIXI.Matrix();
            matrix.scale(Screen.withScale(1), Screen.withScale(1))
            graphics.transform.setFromMatrix(matrix);
        }
        graphics.beginFill((this.currentState.fillStyle || Color.blackColor).rgbHexNumber(), this.currentState.globalAlpha)
        this.currentPathActions.forEach(it => it(graphics));
        graphics.endFill();
        this.canvasGraphics.addChild(graphics)
    }

    stroke() {
        const graphics = new PIXI.Graphics();
        if (this.currentState.currentTransform) {
            const matrix = new PIXI.Matrix();
            matrix.fromArray([this.currentState.currentTransform.a, this.currentState.currentTransform.b, this.currentState.currentTransform.tx, this.currentState.currentTransform.c, this.currentState.currentTransform.d, this.currentState.currentTransform.ty]);
            matrix.scale(Screen.withScale(1), Screen.withScale(1))
            graphics.transform.setFromMatrix(matrix);
        }
        else {
            const matrix = new PIXI.Matrix();
            matrix.scale(Screen.withScale(1), Screen.withScale(1))
            graphics.transform.setFromMatrix(matrix);
        }
        graphics.lineStyle(this.currentState.lineWidth, (this.currentState.strokeStyle || Color.blackColor).rgbHexNumber(), this.currentState.globalAlpha);
        this.currentPathActions.forEach(it => it(graphics));
        this.canvasGraphics.addChild(graphics)
    }

    beginPath(): void {
        this.currentPathActions = []
    }

    moveTo(x: number, y: number): void {
        this.currentPathActions.push((graphics) => {
            graphics.moveTo(x, y);
        })
    }

    closePath(): void {
        this.currentPathActions.push((graphics) => {
            graphics.closePath();
        })
    }

    lineTo(x: number, y: number): void {
        this.currentPathActions.push((graphics) => {
            graphics.lineTo(x, y);
        })
    }

    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void {
        this.currentPathActions.push((graphics) => {
            graphics.quadraticCurveTo(cpx, cpy, x, y);
        })
    }

    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
        this.currentPathActions.push((graphics) => {
            graphics.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        })
    }

    arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise: boolean = false): void {
        this.currentPathActions.push((graphics) => {
            graphics.arc(x, y, r, sAngle, eAngle, counterclockwise);
        })
    }

    postScale(x: number, y: number): void {
        if (this.currentState.currentTransform === undefined) { this.currentState.currentTransform = new TransformMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0) }
        const matrix = new PIXI.Matrix();
        matrix.fromArray([this.currentState.currentTransform.a, this.currentState.currentTransform.b, this.currentState.currentTransform.tx, this.currentState.currentTransform.c, this.currentState.currentTransform.d, this.currentState.currentTransform.ty]);
        matrix.scale(x, y);
        this.currentState.currentTransform = { ...matrix };
    }

    postRotate(angle: number) {
        if (this.currentState.currentTransform === undefined) { this.currentState.currentTransform = new TransformMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0) }
        const matrix = new PIXI.Matrix();
        matrix.fromArray([this.currentState.currentTransform.a, this.currentState.currentTransform.b, this.currentState.currentTransform.tx, this.currentState.currentTransform.c, this.currentState.currentTransform.d, this.currentState.currentTransform.ty]);
        matrix.rotate(angle);
        this.currentState.currentTransform = { ...matrix };
    }

    postTranslate(x: number, y: number): void {
        if (this.currentState.currentTransform === undefined) { this.currentState.currentTransform = new TransformMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0) }
        const matrix = new PIXI.Matrix();
        matrix.fromArray([this.currentState.currentTransform.a, this.currentState.currentTransform.b, this.currentState.currentTransform.tx, this.currentState.currentTransform.c, this.currentState.currentTransform.d, this.currentState.currentTransform.ty]);
        matrix.translate(x, y);
        this.currentState.currentTransform = { ...matrix };
    }

    postTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void {
        if (this.currentState.currentTransform === undefined) { this.currentState.currentTransform = new TransformMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0) }
        const matrix = new PIXI.Matrix();
        matrix.fromArray([this.currentState.currentTransform.a, this.currentState.currentTransform.b, this.currentState.currentTransform.tx, this.currentState.currentTransform.c, this.currentState.currentTransform.d, this.currentState.currentTransform.ty]);
        const appendMatrix = new PIXI.Matrix();
        appendMatrix.fromArray([a, b, tx, c, d, ty]);
        matrix.append(appendMatrix);
        this.currentState.currentTransform = { ...matrix };
    }

    setTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void {
        this.currentState.currentTransform = new TransformMatrix(a, b, c, d, tx, ty);
    }

    save(): void {
        this.stateStack.push(this.currentState);
        this.currentState = { ...this.currentState };
    }

    restore(): void {
        if (this.stateStack.length > 0) {
            this.currentState = this.stateStack.pop() as State
        }
    }

    isPointInPath(x: number, y: number): boolean {
        let tmpGraphics = new PIXI.Graphics();
        tmpGraphics.beginFill(0x000000, 1.0)
        this.currentPathActions.forEach(it => it(tmpGraphics));
        tmpGraphics.endFill();
        return tmpGraphics.containsPoint(new PIXI.Point(x, y))
    }

    setNeedsDisplay(): void {
        this.draw();
        setNeedsDisplay(this);
    }

    protected draw() {
        super.draw();
        this.canvasGraphics.clear();
        this.canvasGraphics.removeChildren();
        this.currentState = new State();
        this.stateStack = [];
        this.onDraw();
    }

    onDraw(): void { }

}