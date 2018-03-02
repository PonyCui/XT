import { Color } from "../interface/Color";
import { View } from "./View";

export class LoadMoreControl extends View {

    listView: any

    private _enabled: boolean = true

    public get enabled(): boolean {
        return this._enabled;
    }

    public set enabled(value: boolean) {
        this._enabled = value;
    }

    private _color: Color = Color.grayColor

    public get color(): Color {
        return this._color;
    }

    public set color(value: Color) {
        this._color = value;
        if (this.listView && this.listView.loadMoreAnimationView) {
            this.listView.loadMoreAnimationView.color = value
        }
    }

    private _isLoading = false

    public get isLoading(): boolean {
        return this._isLoading
    }

    handleLoading() {
        this._isLoading = true
        this.onLoad && this.onLoad()
    }

    endLoading(): void {
        this._isLoading = false
        this.listView && this.listView.endMoreLoading()
    }

    onLoad?: () => void

}