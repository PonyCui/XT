import { Color } from "../interface/Color";

export class RefreshControl {

    static findByRef(ref: string): RefreshControl {
        return objectRefs[ref] || new RefreshControl(ref)
    }

    public objectRef: any;

    constructor(ref: string | undefined = undefined) {
        if (typeof ref === "string") {
            this.objectRef = ref
        }
        else {
            this.objectRef = _XTUIRefreshControl.create()
        }
        objectRefs[this.objectRef] = this;
    }

    public get enabled(): boolean {
        return _XTUIRefreshControl.xtr_enabled(this.objectRef);
    }

    public set enabled(value: boolean) {
        _XTUIRefreshControl.xtr_setEnabledObjectRef(value, this.objectRef)
    }

	public get color(): Color {
		return _XTUIRefreshControl.xtr_color(this.objectRef);
	}

	public set color(value: Color) {
        _XTUIRefreshControl.xtr_setColorObjectRef(value, this.objectRef)
	}

    private _isRefreshing: boolean = false
    private endTimeLimit = 0

    public get isRefreshing(): boolean {
        return this._isRefreshing
    }

    endRefreshing(): void {
        const cost = this.endTimeLimit - (new Date().getTime())
        if (cost > 0) {
            setTimeout(() => {
                this.endRefreshing()
            }, cost)
            return
        }
        this._isRefreshing = false
        _XTUIRefreshControl.xtr_endRefreshing(this.objectRef)
    }

    onRefresh?: (sender: this) => void

    handleRefresh() {
        this._isRefreshing = true
        this.endTimeLimit = (new Date().getTime()) + 500
        this.onRefresh && this.onRefresh(this)
    }

}