import { Color } from "../interface/Color";
import { View } from "./View";
import { RectMake } from "../interface/Rect";

export class RefreshControl {

    listView: any

    private _enabled: boolean = true

    public get enabled(): boolean {
        return this._enabled;
    }

    public set enabled(value: boolean) {
        this._enabled = value;
        if (this.listView) {
            this.listView.scroller.refreshEnabled = value
        }
    }

    private _color: Color = Color.grayColor

    public get color(): Color {
        return this._color;
    }

    public set color(value: Color) {
        this._color = value;
        if (this.listView && this.listView.refreshAnimationView) {
            this.listView.refreshAnimationView.color = value
        }
    }

    private _isRefreshing = false
    private endTimeLimit = 0

    public get isRefreshing(): boolean {
        return this._isRefreshing
    }

    handleRefresh() {
        this._isRefreshing = true
        this.endTimeLimit = (new Date().getTime()) + 1000
        this.onRefresh && this.onRefresh(this)
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
        this.listView && this.listView.endRefreshing()
    }

    onRefresh?: (sender: this) => void

}