import { BaseElement } from './Element'
import { Rect, RectEqual, Point, RectMake, Size } from '../../interface/Rect';
import { TransformMatrix, TransformMatrixAlgorithm } from '../../interface/TransformMatrix';
import { Color } from '../../interface/Color';
import { Application } from '../Application';

export class ViewElement extends BaseElement {

    nativeObject = document.createElementNS("http://www.w3.org/2000/svg", "g");
    backgroundObject = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    contentObject: SVGElement | undefined = undefined
    containerObject = document.createElementNS("http://www.w3.org/2000/svg", "g");
    clipPathObject?: SVGClipPathElement = undefined
    filterObject?: SVGFilterElement = undefined

    constructor(scriptObject: any) {
        super(scriptObject);
        this.nativeObject.setAttribute('id', this.objectRef);
        this.backgroundObject.setAttribute('visibility', 'hidden');
        this.loadContent();
        if (this.contentObject instanceof SVGElement) { this.nativeObject.appendChild(this.contentObject) }
        this.nativeObject.appendChild(this.containerObject);
    }

    protected loadContent() { }

    private frame: Rect = RectMake(0, 0, 0, 0);

    public xtr_frame(): Rect {
        return this.frame
    }

    public xtr_setFrame(value: Rect) {
        if (!RectEqual(this.frame, value)) {
            this.frame = {...value, width: Math.max(0, value.width), height: Math.max(0, value.height)};
            this.resetTransform();
            this.resetMaskElement();
            this.resetHover();
        }
    }

    public xtr_bounds(): Rect {
        return { x: 0, y: 0, width: Math.max(0, this.frame.width), height: Math.max(0, this.frame.height) };
    }

    public xtr_setBounds(value: Rect) { }

    public get xtr_center(): Point {
        return { x: (this.frame.x + this.frame.width) / 2, y: (this.frame.y + this.frame.height) / 2 };
    }

    public set xtr_setCenter(value: Point) {
        this.xtr_setFrame({
            x: value.x - this.frame.width / 2,
            y: value.y - this.frame.height / 2,
            width: this.frame.width,
            height: this.frame.height,
        })
    }

    private transform: TransformMatrix = new TransformMatrix();

    public xtr_transform(): TransformMatrix {
        return this.transform;
    }

    public xtr_setTransform(value: TransformMatrix) {
        if (this.transform.a !== value.a || this.transform.b !== value.b || this.transform.c !== value.c || this.transform.d !== value.d || this.transform.tx !== value.tx || this.transform.ty !== value.ty) {
            this.transform = value;
            this.resetTransform();
        }
    }

    private _cacheTransform: any = undefined
    private _cacheNewTransform: any = undefined
    private _cacheWidth: any = undefined
    private _cacheHeight: any = undefined

    private resetTransform() {
        if (!this.transform.isIdentity()) {
            if (this._cacheTransform === this.transform && this._cacheNewTransform !== undefined) {
                const newTransform = this._cacheNewTransform
                this.nativeObject.setAttribute('transform', 'matrix(' + newTransform.a + ', ' + newTransform.b + ', ' + newTransform.c + ', ' + newTransform.d + ', ' + (newTransform.tx + this.frame.x) + ', ' + (newTransform.ty + this.frame.y) + ')')
            }
            else {
                const obj = new TransformMatrixAlgorithm()
                const unMatrix = TransformMatrix.unmatrix(this.transform)
                obj.translate(-this.frame.width / 2.0, -this.frame.height / 2.0, 0.0)
                obj.rotate(-(unMatrix.degree * Math.PI / 180))
                obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0)
                obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0)
                obj.translate(this.frame.width / 2.0, this.frame.height / 2.0, 0.0)
                const newTransform = new TransformMatrix(obj.props[0], obj.props[1], obj.props[4], obj.props[5], obj.props[12], obj.props[13])
                this.nativeObject.setAttribute('transform', 'matrix(' + newTransform.a + ', ' + newTransform.b + ', ' + newTransform.c + ', ' + newTransform.d + ', ' + (newTransform.tx + this.frame.x) + ', ' + (newTransform.ty + this.frame.y) + ')')
                this._cacheTransform = this.transform
                this._cacheNewTransform = newTransform
            }
        }
        else {
            this.nativeObject.setAttribute('transform', 'matrix(' + this.transform.a + ', ' + this.transform.b + ', ' + this.transform.c + ', ' + this.transform.d + ', ' + (this.transform.tx + this.frame.x) + ', ' + (this.transform.ty + this.frame.y) + ')')
        }
        if (!(this._cacheWidth === this.frame.width && this._cacheHeight === this.frame.height)) {
            this._cacheWidth = this.frame.width
            this._cacheHeight = this.frame.height
            this.backgroundObject.setAttribute('width', this.frame.width.toString())
            this.backgroundObject.setAttribute('height', this.frame.height.toString())
        }
    }

    private clipsToBounds = false

    public xtr_clipsToBounds(): boolean {
        return this.clipsToBounds;
    }

    public xtr_setClipsToBounds(value: boolean) {
        if (this.clipsToBounds != value) {
            this.clipsToBounds = value;
            this.resetMaskElement();
        }
    }

    private previousMaskParams: { clipsToBounds?: boolean, width?: number, height?: number, cornerRadius?: number } = {};

    private resetMaskElement() {
        if (this.previousMaskParams.clipsToBounds === this.clipsToBounds && this.previousMaskParams.width === this.frame.width && this.previousMaskParams.height === this.frame.height && this.previousMaskParams.cornerRadius === this.cornerRadius) { return; }
        this.previousMaskParams.clipsToBounds = this.clipsToBounds
        this.previousMaskParams.width = this.frame.width
        this.previousMaskParams.height = this.frame.height
        this.previousMaskParams.cornerRadius = this.cornerRadius
        if (this.clipsToBounds) {
            const clipPathObject = this.clipPathObject || document.createElementNS("http://www.w3.org/2000/svg", "clipPath")
            clipPathObject.setAttribute('id', this.objectRef + ".clipPath");
            clipPathObject.innerHTML = '';
            clipPathObject.appendChild(this.createMaskPath())
            this.clipPathObject = clipPathObject;
            if (!Application.sharedApplication()!.defsElement.contains(clipPathObject)) {
                Application.sharedApplication()!.defsElement.appendChild(clipPathObject)
            }
            this.nativeObject.style.clipPath = 'url(#' + (this.objectRef + ".clipPath") + ')'
        }
        else {
            this.nativeObject.style.clipPath = null
        }
    }

    private createMaskPath(): SVGElement {
        const maskPath = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        maskPath.setAttribute("width", this.frame.width.toString());
        maskPath.setAttribute("height", this.frame.height.toString());
        if (this.cornerRadius > 0) {
            maskPath.setAttribute("rx", this.cornerRadius.toString())
            maskPath.setAttribute("ry", this.cornerRadius.toString())
        }
        return maskPath
    }

    private backgroundColor: Color = Color.clearColor;

    public xtr_backgroundColor(): Color {
        return this.backgroundColor
    }

    public xtr_setBackgroundColor(value: Color) {
        this.backgroundColor = value;
        this.backgroundObject.setAttribute('fill', 'rgba(' + (this.backgroundColor.r * 255).toFixed(0) + ', ' + (this.backgroundColor.g * 255).toFixed(0) + ', ' + (this.backgroundColor.b * 255).toFixed(0) + ', ' + this.backgroundColor.a.toString() + ')')
        this.resetBackgroundVisibility()
    }

    private resetBackgroundVisibility() {
        if (this.backgroundColor.a > 0 || (this.borderWidth > 0 && this.borderColor.a > 0)) {
            this.backgroundObject.setAttribute('visibility', 'inherit');
            if (this.backgroundColor.a == 0) {
                this.backgroundObject.setAttribute('fill', 'none')
            }
            if (this.backgroundObject.parentNode === null) {
                this.nativeObject.insertBefore(this.backgroundObject, this.nativeObject.childNodes[0])
            }
        }
        else {
            this.backgroundObject.setAttribute('visibility', 'hidden');
        }
    }

    private alpha = 1.0

    public xtr_alpha(): number {
        return this.alpha;
    }

    public xtr_setAlpha(value: number) {
        if (this.alpha != value) {
            this.alpha = value;
            this.nativeObject.setAttribute('opacity', this.alpha.toString())
        }
    }

    public xtr_tintColorDidChange() { }

    private hidden = false

    public xtr_hidden(): boolean {
        return this.hidden
    }

    public xtr_setHidden(value: boolean) {
        if (this.hidden !== value) {
            this.hidden = value
            this.nativeObject.setAttribute('visibility', this.hidden ? 'hidden' : 'inherit');
        }
    }

    private contentMode: number = 0

    public xtr_contentMode(): number {
        return this.contentMode
    }

    public xtr_setContentMode(value: number) {
        if (this.contentMode !== value) {
            this.contentMode = value
        }
    }

    private cornerRadius = 0.0

    public xtr_cornerRadius(): number {
        return this.cornerRadius;
    }

    public xtr_setCornerRadius(value: number) {
        if (this.cornerRadius != value) {
            this.cornerRadius = value;
            this.backgroundObject.setAttribute("rx", value.toString())
            this.backgroundObject.setAttribute("ry", value.toString())
            this.resetMaskElement();
        }
    }

    private borderWidth = 0.0

    public xtr_borderWidth(): number {
        return this.borderWidth;
    }

    public xtr_setBorderWidth(value: number) {
        if (this.borderWidth != value) {
            this.borderWidth = value;
            this.backgroundObject.setAttribute("stroke-width", value.toString())
        }
        this.resetBackgroundVisibility()
    }

    private borderColor: Color = Color.clearColor;

    public xtr_borderColor(): Color {
        return this.borderColor
    }

    public xtr_setBorderColor(value: Color) {
        this.borderColor = value;
        this.backgroundObject.setAttribute('stroke', 'rgba(' + (this.borderColor.r * 255).toFixed(0) + ', ' + (this.borderColor.g * 255).toFixed(0) + ', ' + (this.borderColor.b * 255).toFixed(0) + ', ' + this.borderColor.a.toString() + ')')
        this.resetBackgroundVisibility()
    }

    private shadowColor: Color = Color.clearColor;

    public xtr_shadowColor(): Color {
        return this.shadowColor
    }

    public xtr_setShadowColor(value: Color) {
        this.shadowColor = value;
        this.resetFilter();
    }

    private shadowOpacity = 0.0

    public xtr_shadowOpacity(): number {
        return this.shadowOpacity;
    }

    public xtr_setShadowOpacity(value: number) {
        if (this.shadowOpacity != value) {
            this.shadowOpacity = value;
            this.resetFilter()
        }
    }

    private shadowOffset: Size = { width: 0, height: -3 }

    public xtr_shadowOffset(): Size {
        return this.shadowOffset;
    }

    public xtr_setShadowOffset(value: Size) {
        if (this.shadowOffset != value) {
            this.shadowOffset = value;
            this.resetFilter()
        }
    }

    private shadowRadius = 3.0

    public xtr_shadowRadius(): number {
        return this.shadowRadius;
    }

    public xtr_setShadowRadius(value: number) {
        if (this.shadowRadius != value) {
            this.shadowRadius = value;
            this.resetFilter()
        }
    }

    private resetFilter() {
        if (this.shadowOpacity > 0.0) {
            const filterObject = this.filterObject || document.createElementNS("http://www.w3.org/2000/svg", "filter");
            filterObject.setAttribute("x", "-500%")
            filterObject.setAttribute("y", "-500%")
            filterObject.setAttribute("width", "1000%")
            filterObject.setAttribute("height", "1000%")
            filterObject.setAttribute('id', this.objectRef + ".filter");
            filterObject.innerHTML = '';
            if (this.shadowColor !== undefined) {
                const shadowObject = document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
                shadowObject.setAttribute("dx", this.shadowOffset.width.toString());
                shadowObject.setAttribute("dy", this.shadowOffset.height.toString());
                shadowObject.setAttribute("stdDeviation", this.shadowRadius.toString());
                shadowObject.setAttribute("flood-color", 'rgba(' + (this.shadowColor.r * 255).toFixed(0) + ', ' + (this.shadowColor.g * 255).toFixed(0) + ', ' + (this.shadowColor.b * 255).toFixed(0) + ', ' + this.shadowColor.a.toString() + ')')
                shadowObject.setAttribute("flood-opacity", this.shadowOpacity.toString());
                filterObject.appendChild(shadowObject);
            }
            this.filterObject = filterObject;
            if (!Application.sharedApplication()!.defsElement.contains(filterObject)) {
                Application.sharedApplication()!.defsElement.appendChild(filterObject)
            }
            this.nativeObject.style.filter = 'url(#' + (this.objectRef + ".filter") + ')'
        }
        else {
            this.nativeObject.style.filter = '';
        }
    }

    private superview: ViewElement | undefined
    private subviews: ViewElement[] = []

    private tag: number = 0;

    public xtr_tag(): number {
        return this.tag
    }

    public xtr_setTag(value: number) {
        this.tag = value || 0
    }

    public xtr_superview(): ViewElement | undefined {
        return this.superview
    }

    public xtr_subviews(): ViewElement[] {
        return this.subviews
    }

    public xtr_removeFromSuperview() {
        if (this.superview !== undefined) {
            this.superview.containerObject.removeChild(this.nativeObject);
            this.superview.subviews = this.superview.subviews.filter(t => t != this);
            this.superview = undefined;
        }
    }

    public xtr_insertSubviewAtIndexAtIndex(subview: ViewElement, atIndex: number) {
        if (subview.superview !== undefined) { subview.xtr_removeFromSuperview() }
        if (atIndex < this.subviews.length) {
            subview.superview = this
            this.containerObject.insertBefore(subview.nativeObject, this.subviews[atIndex].nativeObject)
            this.subviews.splice(atIndex, 0, subview);
        }
        else {
            this.xtr_addSubview(subview);
        }
    }

    public xtr_exchangeSubviewAtIndexIndex2(index1: number, index2: number) {
        if (index1 < index2) {
            const index1View = this.subviews[index1];
            const index2View = this.subviews[index2];
            this.containerObject.removeChild(index1View.nativeObject);
            this.containerObject.insertBefore(index1View.nativeObject, index2View.nativeObject)
            this.containerObject.removeChild(index2View.nativeObject);
            this.containerObject.insertBefore(index2View.nativeObject, this.containerObject.children[index1]);
        }
        else if (index1 > index2) {
            const index1View = this.subviews[index1];
            const index2View = this.subviews[index2];
            this.containerObject.removeChild(index2View.nativeObject);
            this.containerObject.insertBefore(index2View.nativeObject, index1View.nativeObject)
            this.containerObject.removeChild(index1View.nativeObject);
            this.containerObject.insertBefore(index1View.nativeObject, this.containerObject.children[index2]);
        }
    }

    public xtr_addSubview(subview: ViewElement) {
        if (subview.superview !== undefined) { subview.xtr_removeFromSuperview() }
        subview.superview = this
        this.containerObject.appendChild(subview.nativeObject)
        this.subviews.push(subview)
    }

    public xtr_insertSubviewBelowSiblingSubview(subview: ViewElement, siblingSubview: ViewElement) {
        if (subview.superview !== undefined) { subview.xtr_removeFromSuperview() }
        subview.superview = this
        this.subviews.splice(this.subviews.indexOf(siblingSubview), 0, subview);
        this.containerObject.insertBefore(subview.nativeObject, siblingSubview.nativeObject)
    }

    public xtr_insertSubviewAboveSiblingSubview(subview: ViewElement, siblingSubview: ViewElement) {
        if (subview.superview !== undefined) { subview.xtr_removeFromSuperview() }
        if (this.subviews.indexOf(siblingSubview) == this.subviews.length - 1) {
            this.xtr_addSubview(subview);
        }
        else {
            subview.superview = this
            this.subviews.splice(this.subviews.indexOf(siblingSubview) + 1, 0, subview);
            this.containerObject.insertBefore(subview.nativeObject, this.containerObject.children[this.subviews.indexOf(siblingSubview) + 1])
        }
    }

    public xtr_bringSubviewToFront(subview: ViewElement) {
        if (this.subviews.length > 1) {
            this.containerObject.removeChild(subview.nativeObject)
            this.containerObject.appendChild(subview.nativeObject)
            this.subviews = this.subviews.filter(t => t != subview)
            this.subviews.push(subview)
        }
    }

    public xtr_sendSubviewToBack(subview: ViewElement) {
        if (this.subviews.length > 1) {
            this.containerObject.removeChild(subview.nativeObject)
            this.containerObject.insertBefore(subview.nativeObject, this.containerObject.firstChild)
            this.subviews = this.subviews.filter(t => t != subview)
            this.subviews.unshift(subview)
        }
    }

    public xtr_isDescendantOfView(view: ViewElement): boolean {
        let current: any = this
        while (current != undefined) {
            if (current == view) {
                return true
            }
            current = current.superview
        }
        return false
    }

    public xtr_viewWithTag(tag: number): ViewElement | undefined {
        for (let index = 0; index < this.subviews.length; index++) {
            let element = this.subviews[index];
            if (element.tag === tag) {
                return element
            }
            let target = element.xtr_viewWithTag(tag);
            if (target !== undefined) {
                return target
            }
        }
        return undefined
    }

    private hoverMode = false
    private hoverElement: SVGRectElement | undefined

    public xtr_setHoverMode(value: boolean) {
        this.hoverMode = value
    }

    private resetHover() {
        if (navigator.userAgent.indexOf("Mobile") >= 0) { return }
        if (this.hoverMode) {
            if (this.hoverElement === undefined) {
                this.hoverElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                this.hoverElement.style.cursor = "pointer"
                this.hoverElement.style.fill = "transparent"
                this.nativeObject.appendChild(this.hoverElement)
                this.hoverElement.addEventListener("mouseover", () => {
                    if (this.scriptObject.onHover) {
                        this.scriptObject.onHover(true)
                    }
                })
                this.hoverElement.addEventListener("mouseout", () => {
                    if (this.scriptObject.onHover) {
                        this.scriptObject.onHover(false)
                    }
                })
            }
            this.hoverElement.style.width = this.frame.width.toString()
            this.hoverElement.style.height = this.frame.height.toString()
        }
        else {
            if (this.hoverElement !== undefined) {
                this.nativeObject.removeChild(this.hoverElement)
            }
        }
    }

}