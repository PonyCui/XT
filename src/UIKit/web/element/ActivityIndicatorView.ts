import { ViewElement } from "./View";

const smallElement = `<svg class="lds-spinner" width="36px" height="36px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background-image: none; background-position: initial initial; background-repeat: initial initial;"><g transform="rotate(0 50 50)" class=""> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f" class=""> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite" class=""></animate> </rect> </g><g transform="rotate(30 50 50)" class=""> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f" class=""> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite" class=""></animate> </rect> </g><g transform="rotate(60 50 50)" class=""> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f" class=""> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite" class=""></animate> </rect> </g><g transform="rotate(90 50 50)" class=""> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f" class=""> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite" class=""></animate> </rect> </g><g transform="rotate(120 50 50)" class=""> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f" class=""> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite" class=""></animate> </rect> </g><g transform="rotate(150 50 50)" class=""> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f" class=""> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite" class=""></animate> </rect> </g><g transform="rotate(180 50 50)" class=""> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f" class=""> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite" class=""></animate> </rect> </g><g transform="rotate(210 50 50)" class=""> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f" class=""> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite" class=""></animate> </rect> </g><g transform="rotate(240 50 50)" class=""> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f" class=""> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite" class=""></animate> </rect> </g><g transform="rotate(270 50 50)" class=""> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f" class=""> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite" class=""></animate> </rect> </g><g transform="rotate(300 50 50)" class=""> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f" class=""> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite" class=""></animate> </rect> </g><g transform="rotate(330 50 50)" class=""> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f" class=""> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="0s" repeatCount="indefinite" class=""></animate> </rect> </g></svg>`
const largeElement = `<svg class="lds-spinner" width="88px" height="88px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background-image: none; background-position: initial initial; background-repeat: initial initial;"><g transform="rotate(0 50 50)"> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f"> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(30 50 50)"> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f"> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(60 50 50)"> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f"> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(90 50 50)"> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f"> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(120 50 50)"> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f"> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(150 50 50)"> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f"> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(180 50 50)"> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f"> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(210 50 50)"> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f"> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(240 50 50)"> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f"> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(270 50 50)"> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f"> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(300 50 50)"> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f"> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(330 50 50)"> <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f"> <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate> </rect> </g></svg>`

export class ActivityIndicatorViewElement extends ViewElement {

    contentObject: SVGElement

    loadContent() {
        super.loadContent()
        this.contentObject = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.contentObject.style.width = "100%"
        this.contentObject.style.height = "100%"
        this.nativeObject.appendChild(this.contentObject)
    }

    xtr_setFrame(frame: any) {
        super.xtr_setFrame(frame)
        this.resetContent()
    }

    private _style = 0

    xtr_style() {
        return this._style
    }

    xtr_setStyle(value: number) {
        this._style = value
        this.resetContent()
    }

    private _animating = false

    xtr_animating() {
        return this._animating
    }

    xtr_startAnimating() {
        this._animating = true
        this.resetContent()
    }

    xtr_stopAnimating() {
        this._animating = false
        this.resetContent()
    }

    resetContent() {
        let content = ""
        let size = 0
        if (this._animating) {
            if (this._style == 0) {
                content = smallElement
                size = 36
            }
            else if (this._style == 1) {
                content = largeElement
                size = 88
            }
        }
        const tintColor = this.scriptObject.tintColor
        content = content.replace(/fill="#28292f"/g, 'fill="rgba(' + (tintColor.r * 255).toFixed(0) + ', ' + (tintColor.g * 255).toFixed(0) + ', ' + (tintColor.b * 255).toFixed(0) + ', ' + tintColor.a.toString() + ')"');
        if (content.length > 0) {

            this.contentObject.innerHTML = content;
            if (this.contentObject.childNodes.length === 0) {
                var dummy = document.createElement('div');
                dummy.innerHTML = '<svg>' + content + '</svg>';
                if (dummy.childNodes[0].childNodes[0]) {
                    this.contentObject.appendChild(dummy.childNodes[0].childNodes[0])
                }
            }
            this.contentObject.style.transform = "matrix(1.0, 0.0, 0.0, 1.0, " + ((this.xtr_bounds().width - size) / 2.0) + ", " + ((this.xtr_bounds().height - size) / 2.0) + ")"
            this.contentObject.style.webkitTransform = this.contentObject.style.transform
        }
        else {
            for (let index = 0; index < this.contentObject.childNodes.length; index++) {
                this.contentObject.removeChild(this.contentObject.childNodes[index])
            }
        }
    }

}