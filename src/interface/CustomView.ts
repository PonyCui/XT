import { View } from './View'
import { Rect } from './Rect';

export class CustomView extends View {

    onMessage?: (message: string) => void = undefined
    constructor(className: string, rect?: Rect) { super(rect) }
    emitMessage(message: any) { }
    handleMessage(message: any) { }

}