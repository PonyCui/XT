import { ViewElement } from "./View";
import { Image } from "../ImageView";
import { Rect, RectMake } from "../../interface/Rect";
import { ContentMode, ImageRenderingMode } from "../../interface/ImageView";
import { Color } from "../../interface/Color";
import { Application } from "../Application";

export class ImageViewElement extends ViewElement {

    tintColorFilterWrapper: SVGFilterElement | undefined = undefined
    tintColorFilter: SVGFEColorMatrixElement | undefined = undefined

    loadContent() {
        super.loadContent();
        this.contentObject = document.createElementNS("http://www.w3.org/2000/svg", "image");
    }

    private _image: Image | undefined

    xtr_setImage(value: Image | undefined) {
        this._image = value;
        if (value) {
            const contentObject = this.contentObject as SVGImageElement
            contentObject.setAttributeNS("http://www.w3.org/1999/xlink", "href", value.URLString)
            this.resetRatio();
            this.resetTintColor();
        }
        else {
            const contentObject = this.contentObject as SVGImageElement
            contentObject.setAttributeNS("http://www.w3.org/1999/xlink", "href", "")
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
        clearTimeout(this._loadImageTimer)
        cancelAnimationFrame(this._fadeInHandler)
        if (this.contentObject) {
            if (!this._nullHref) {
                this.contentObject.setAttributeNS("http://www.w3.org/1999/xlink", "href", "")
                this._nullHref = true
            }
            this._loadImageTimer = setTimeout(() => {
                this._nullHref = false
                if (this.contentObject) {
                    this.contentObject.setAttributeNS("http://www.w3.org/1999/xlink", "href", url)
                }
            }, 300)
        }
    }

    xtr_fadeIn(currentValue: number) {
        this._fadeInHandler = requestAnimationFrame(() => {
            currentValue += 0.05
            if (currentValue > 1.0) { return }
            if (this.contentObject) {
                this.contentObject.style.opacity = currentValue.toString()
            }
            this.xtr_fadeIn(currentValue)
        })
    }

    xtr_setFrame(value: Rect) {
        super.xtr_setFrame(value)
        if (this.contentObject) {
            this.contentObject.setAttribute("width", value.width.toString())
            this.contentObject.setAttribute("height", value.height.toString())
            this.resetRatio();
        }
    }

    private _contentMode: number = 0

    xtr_setContentMode(value: number) {
        super.xtr_setContentMode(value)
        this._contentMode = value
        this.resetRatio();
    }

    private resetRatio() {
        if (this.contentObject) {
            if (this._contentMode == ContentMode.ScaleToFill) {
                this.contentObject.setAttribute("preserveAspectRatio", "xMinYMin")
                const frame = this.xtr_frame()
                if (this._image && frame.width > 0.0 && frame.height > 0.0) {
                    let widthRatio = 1.0
                    let heightRatio = 1.0
                    const targetRatio = frame.width / frame.height
                    const imageRatio = this._image.size.width / this._image.size.height;
                    if (targetRatio < imageRatio) {
                        const hPI = frame.width / (this._image.size.width / this._image.size.height)
                        heightRatio = frame.height / hPI;
                    }
                    else if (targetRatio >= imageRatio) {
                        const wPI = frame.height / (this._image.size.height / this._image.size.width)
                        widthRatio = frame.width / wPI;
                    }
                    this.contentObject.setAttribute("transform", "matrix(" + widthRatio.toFixed(3) + ", 0.0, 0.0, " + heightRatio.toFixed(3) + ", 0.0, 0.0)")
                }
            }
            else if (this._contentMode == ContentMode.ScaleAspectFit) {
                this.contentObject.setAttribute("preserveAspectRatio", "xMidYMid meet")
                this.contentObject.removeAttribute("transform");
            }
            else if (this._contentMode == ContentMode.ScaleAspectFill) {
                this.contentObject.setAttribute("preserveAspectRatio", "xMidYMid slice")
                this.contentObject.removeAttribute("transform");
            }
        }
    }

    private resetTintColor() {
        if (this._image && this.contentObject && this._image.renderingMode === ImageRenderingMode.Template) {
            const tintColor: Color = this.scriptObject.tintColor
            if (tintColor === undefined) {
                return;
            }
            const tintColorFilterWrapper = this.tintColorFilterWrapper || document.createElementNS("http://www.w3.org/2000/svg", "filter")
            const tintColorFilter = this.tintColorFilter || document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix")
            tintColorFilter.setAttribute("values", "0 0 0 0 " + tintColor.r.toFixed(3) + " 0 0 0 0 " + tintColor.g.toFixed(3) + " 0 0 0 0 " + tintColor.b.toFixed(3) + " 0 0 0 " + tintColor.a.toFixed(3) + " 0")
            tintColorFilterWrapper.setAttribute('id', this.objectRef + ".tintColorFilter");
            tintColorFilterWrapper.innerHTML = '';
            tintColorFilterWrapper.appendChild(tintColorFilter);
            this.tintColorFilterWrapper = tintColorFilterWrapper;
            this.tintColorFilter = tintColorFilter;
            if (!Application.sharedApplication()!.defsElement.contains(tintColorFilterWrapper)) {
                Application.sharedApplication()!.defsElement.appendChild(tintColorFilterWrapper)
            }
            this.contentObject.style.filter = 'url(#' + (this.objectRef + ".tintColorFilter") + ')'
        }
        else if (this.contentObject) {
            this.contentObject.style.filter = ''
        }
    }

    xtr_tintColorDidChange() {
        super.xtr_tintColorDidChange();
        this.resetTintColor();
    }

}