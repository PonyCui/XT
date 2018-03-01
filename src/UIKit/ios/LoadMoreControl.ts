import { View } from "./View";
import { Color } from "../interface/Color";

export class LoadMoreControl extends View {

    constructor(ref: any = undefined) {
        super(ref || _XTUILoadMoreControl)
    }

    public get enabled(): boolean {
        return _XTUILoadMoreControl.xtr_enabled(this.objectRef);
    }

    public set enabled(value: boolean) {
        _XTUILoadMoreControl.xtr_setEnabledObjectRef(value, this.objectRef)
    }

	public get color(): Color {
		return _XTUILoadMoreControl.xtr_color(this.objectRef);
	}

	public set color(value: Color) {
        _XTUILoadMoreControl.xtr_setColorObjectRef(value, this.objectRef)
	}

    private _isLoad: boolean = false
    private endTimeLimit = 0

    public get isLoad(): boolean {
        return this._isLoad
    }

    endLoading(): void {
        const cost = this.endTimeLimit - (new Date().getTime())
        if (cost > 0) {
            setTimeout(() => {
                this.endLoading()
            }, cost)
            return
        }
        this._isLoad = false
        _XTUILoadMoreControl.xtr_endLoading(this.objectRef)
    }

    onLoad?: () => void

    handleLoad() {
        this._isLoad = true
        this.endTimeLimit = (new Date().getTime()) + 500
        this.onLoad && this.onLoad()
    }

}