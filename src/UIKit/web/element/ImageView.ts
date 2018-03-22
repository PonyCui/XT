import { ViewElement } from "./View";
import { Image } from "../ImageView";
import { Rect, RectMake } from "../../interface/Rect";
import { ContentMode, ImageRenderingMode } from "../../interface/ImageView";
import { Color } from "../../interface/Color";
import { Application } from "../Application";
import { RequestIdleCallback } from "./requestIdleCallback";

export class ImageViewElement extends ViewElement {

    private _image: Image | undefined

    xtr_setImage(value: Image | undefined) {
        if (this._image) {
            this.nativeObject.removeChild(this._image.source)
        }
        this._image = value;
        if (value) {
            this.nativeObject.appendChild(value.source)
            this.resetRatio();
            this.resetTintColor();
        }
    }

    private _fadeInHandler = 0
    private _loadImageTimer: any
    private _currentUrl: any
    private _nullHref = false
    private _onLoadListenner: any

    xtr_loadImage(url: string, fadeIn: boolean = true) {
        if (this._currentUrl === url) { return; }
        this._currentUrl = url
        if (this._image) {
            this._image.source.style.display = "none"
        }
        this._image = undefined
        const startTime = performance.now()
        RequestIdleCallback.add(() => {
            Image.fromURL(url, (it) => {
                if (it.URLString == this._currentUrl) {
                    this.xtr_setImage(it)
                    if (fadeIn && performance.now() - startTime > 100) {
                        this.xtr_fadeIn(0.0)
                    }
                    else {
                        it.source.style.opacity = "1.0"
                    }
                }
            })
        }, this.objectRef)
    }

    xtr_fadeIn(currentValue: number) {
        this._fadeInHandler = requestAnimationFrame(() => {
            currentValue += 0.05
            if (currentValue > 1.0) { return }
            if (this._image) {
                this._image.source.style.opacity = currentValue.toString()
            }
            this.xtr_fadeIn(currentValue)
        })
    }

    private _contentMode: number = 0

    xtr_setContentMode(value: number) {
        super.xtr_setContentMode(value)
        this._contentMode = value
        this.resetRatio();
    }

    private resetRatio() {
        if (this._image) {
            if (this._contentMode == ContentMode.ScaleToFill) {
                this._image.source.style.width = "100%"
                this._image.source.style.height = "100%"
                this._image.source.style.setProperty("object-fit", "fill")
            }
            else if (this._contentMode == ContentMode.ScaleAspectFit) {
                this._image.source.style.width = "100%"
                this._image.source.style.height = "100%"
                this._image.source.style.setProperty("object-fit", "contain")
            }
            else if (this._contentMode == ContentMode.ScaleAspectFill) {
                this._image.source.style.width = "100%"
                this._image.source.style.height = "100%"
                this._image.source.style.setProperty("object-fit", "cover")
            }
        }
    }

    private resetTintColor() {

    }

    xtr_tintColorDidChange() {
        super.xtr_tintColorDidChange();
        this.resetTintColor();
    }

}