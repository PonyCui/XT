import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';
import * as PIXI from 'pixi.js'

export class CustomView extends View {

    static classMapping: any = {};

    static registerClass(viewClass: any, className: string) {
        this.classMapping[className] = viewClass;
    }

    onMessage?: (message: string) => any = undefined
    private className: string;
    private innerObject: any;

    constructor(className: string, rect?: Rect) {
        super(rect);
        this.className = className
    }

    init() {
        if (CustomView.classMapping[this.className]) {
            const obj = CustomView.classMapping[this.className](this)
            if (obj.innerView instanceof PIXI.DisplayObject) {
                this.nativeObject.addChild(obj.innerView);
                this.innerObject = obj;
            }
            else if (obj instanceof PIXI.DisplayObject) {
                this.nativeObject.addChild(obj);
                this.innerObject = obj;
            } 
        }
    }

    emitMessage(message: any): any {
        if (this.innerObject.handleMessage) {
            return this.innerObject.handleMessage(message, this);
        }
    }

    handleMessage(message: any): any {
        if (this.onMessage) {
            return this.onMessage(message);
        }
        return undefined
    }

}