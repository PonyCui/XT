import { View } from './View'
import { Rect } from './Rect';

export class CustomView extends View {

    onMessage?: (message: string) => any = undefined
    props: any = {}
    constructor(className: string, rect?: Rect) { super(rect) }
    emitMessage(message: any): any { }
    handleMessage(message: any): any { }

}