import { Color } from "../interface/Color";
import { View } from "./View";
import { RectMake } from "../interface/Rect";

export class RefreshControl {

    listView: any

    private _enabled: boolean = true

	public get enabled(): boolean  {
		return this._enabled;
	}

	public set enabled(value: boolean ) {
        this._enabled = value;
        this.listView.scroller.refreshEnabled = value
	}
    
    color: Color

    private _isRefreshing = false
    private endTimeLimit = 0

    public get isRefreshing(): boolean {
        return this._isRefreshing
    }

    handleRefresh() {
        this._isRefreshing = true
        this.endTimeLimit = (new Date().getTime()) + 1000
        this.onRefresh && this.onRefresh()
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
        this.listView.endRefreshing()
    }

    onRefresh?: () => void

}