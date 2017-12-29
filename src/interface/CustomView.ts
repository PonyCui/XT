import { View } from './View'
import { Rect } from './Rect';

export class CustomView extends View {

    constructor(ref: any, className: string) { super() }
    onMessage?: (message: string) => any = undefined
    props: any = {}
    emitMessage(message: any): any { }
    handleMessage(message: any): any { }

}