import { View } from './View'
import { Color } from './Color';

export class CanvasView extends View {

    fillStyle?: Color
    strokeStyle?: Color
    lineCap?: string
    lineJoin?: string
    lineWidth: number
    miterLimit: number
    fillRect(x: number, y: number, width: number, height: number): void { }
    onDraw(): void { }

}