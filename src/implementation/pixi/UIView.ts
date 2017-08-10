import * as I from '../../interface/Interfaces'
const PIXI = (window as any).PIXI

export class UIView implements I.UIView {

    nativeObject: any
    private _frame: I.CGRect = I.CGRectZero
    bounds: I.CGRect = I.CGRectZero

    constructor(rect?: I.CGRect) {
        this.nativeObject = new PIXI.Container();
        if (rect as I.CGRect) {
            this.frame = rect
            this.bounds = I.CGRectMake(0, 0, rect.width, rect.height)
        }
    }

    public get alpha() {
        return this.nativeObject.alpha
    }

    public set alpha(value: number) {
        this.nativeObject.alpha = value;
    }

    public get frame() {
        return this._frame
    }

    public set frame(value: I.CGRect | any) {
        this._frame = value
        this.nativeObject.hitArea = new PIXI.Rectangle(0, 0, value.width, value.height)
    }

}