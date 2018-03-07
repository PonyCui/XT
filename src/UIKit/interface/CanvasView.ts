import { View } from './View'
import { Color } from './Color';
import { Rect } from './Rect';

export class CanvasView extends View {
    
    globalAlpha: number = 1.0
    fillStyle: Color
    strokeStyle: Color
    lineCap: "butt" | "round" | "square"
    lineJoin: "bevel" | "round" | "miter"
    lineWidth: number = 1.0
    miterLimit: number
    rect(x: number, y: number, width: number, height: number): void { }
    fillRect(x: number, y: number, width: number, height: number): void { }
    strokeRect(x: number, y: number, width: number, height: number): void { }
    fill(): void { }
    stroke(): void { }
    beginPath(): void { }
    moveTo(x: number, y: number): void { }
    closePath(): void { }
    lineTo(x: number, y: number): void { }
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void { }
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void { }
    arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise: boolean = false): void { }
    isPointInPath(x: number, y: number): boolean { return false }
    postScale(x: number, y: number): void { }
    postRotate(angle: number) { }
    postTranslate(x: number, y: number): void { }
    postTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void { }
    setTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void { }
    save(): void { }
    restore(): void { }
    clear(): void { }

}