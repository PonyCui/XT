import { View } from './View'
import { Color } from './Color';

export class CanvasView extends View {

    fillStyle?: Color
    strokeStyle?: Color
    lineCap?: string
    lineJoin?: string
    lineWidth: number = 1
    miterLimit: number
    rect(x: number, y: number, width: number, height: number): void { }
    fillRect(x: number, y: number, width: number, height: number): void { }
    strokeRect(x: number, y: number, width: number, height: number): void { }
    clearRect(x: number, y: number, width: number, height: number): void { }
    fill(): void { }
    stroke(): void { }
    beginPath(): void { }
    moveTo(x: number, y: number): void { }
    closePath(): void { }
    lineTo(x: number, y: number): void { }
    clip(): void { }
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void { }
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void { }
    arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise: boolean = false): void { }
    isPointInPath(x: number, y: number): void { }
    setNeedsDisplay(): void { }
    onDraw(): void { }

}