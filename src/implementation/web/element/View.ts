import { Element } from './Element'
import { Rect, RectEqual, Point, RectMake } from '../../../interface/Rect';
import { TransformMatrix } from '../../../interface/TransformMatrix';
import { Color } from '../../../interface/Color';

export class ViewElement extends Element {

    nativeObject = document.createElementNS("http://www.w3.org/2000/svg", "g");
    backgroundObject = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    containerObject = document.createElementNS("http://www.w3.org/2000/svg", "g");
    maskObject?: SVGMaskElement = undefined

    constructor(frame: Rect, scriptObject: any) {
        super(scriptObject);
        this.nativeObject.setAttribute('id', this.objectUUID);
        this.backgroundObject.setAttribute('visibility', 'hidden');
        this.nativeObject.appendChild(this.backgroundObject);
        this.nativeObject.appendChild(this.containerObject);
        this.xtr_setFrame(frame)
    }

    private frame: Rect = RectMake(0, 0, 0, 0);

    public xtr_frame(): Rect {
        return this.frame
    }

    public xtr_setFrame(value: Rect) {
        if (!RectEqual(this.frame, value)) {
            this.frame = value;
            this.resetTransform();
        }
    }

    public xtr_bounds(): Rect {
        return { x: 0, y: 0, width: this.frame.width, height: this.frame.height };
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

    private resetTransform() {
        this.nativeObject.setAttribute('transform', 'matrix(' + this.transform.a + ', ' + this.transform.b + ', ' + this.transform.c + ', ' + this.transform.d + ', ' + (this.transform.tx + this.frame.x) + ', ' + (this.transform.ty + this.frame.y) + ')')
        this.backgroundObject.setAttribute('width', this.frame.width.toString())
        this.backgroundObject.setAttribute('height', this.frame.height.toString())
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

    private resetMaskElement() {
        if (this.clipsToBounds) {
            const maskObject = this.maskObject || document.createElementNS("http://www.w3.org/2000/svg", "mask");
            maskObject.setAttribute('id', this.objectUUID + ".mask");
            maskObject.innerHTML = '';
            maskObject.appendChild(this.createMaskPath())
            this.maskObject = maskObject;
            const defs = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "defs")[0]
            if (!defs.contains(maskObject)) {
                defs.appendChild(maskObject)
            }
            this.nativeObject.style.mask = 'url(#' + (this.objectUUID + ".mask") + ')'
        }
        else {
            this.nativeObject.style.mask = ''
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
        maskPath.style.fill = "white";
        return maskPath
    }

    private backgroundColor?: Color;

    public xtr_backgroundColor(): Color | undefined {
        return this.backgroundColor
    }

    public xtr_setBackgroundColor(value: Color | undefined) {
        this.backgroundColor = value;
        if (this.backgroundColor !== undefined) {
            this.backgroundObject.setAttribute('visibility', 'inherit');
            this.backgroundObject.setAttribute('fill', 'rgba(' + (this.backgroundColor.r * 255).toFixed(0) + ', ' + (this.backgroundColor.g * 255).toFixed(0) + ', ' + (this.backgroundColor.b * 255).toFixed(0) + ', ' + this.backgroundColor.a.toString() + ')')
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
    }

    private borderColor?: Color;

    public xtr_borderColor(): Color | undefined {
        return this.borderColor
    }

    public xtr_setBorderColor(value: Color | undefined) {
        this.borderColor = value;
        if (this.borderColor !== undefined) {
            this.backgroundObject.setAttribute('stroke', 'rgba(' + (this.borderColor.r * 255).toFixed(0) + ', ' + (this.borderColor.g * 255).toFixed(0) + ', ' + (this.borderColor.b * 255).toFixed(0) + ', ' + this.borderColor.a.toString() + ')')
        }
    }

    private superview: ViewElement | undefined
    private subviews: ViewElement[] = []

    private tag: number = 0;

    public xtr_tag(): number | undefined {
        return this.tag
    }

    public xtr_setTag(value: number | undefined) {
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
        if (subview.superview !== undefined) { throw Error("subview has been added to another view.") }
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
        if (subview.superview !== undefined) { throw Error("subview has been added to another view.") }
        subview.superview = this
        this.containerObject.appendChild(subview.nativeObject)
        this.subviews.push(subview)
    }

    public xtr_insertSubviewBelowSiblingSubview(subview: ViewElement, siblingSubview: ViewElement) {
        if (subview.superview !== undefined) { throw Error("subview has been added to another view.") }
        subview.superview = this
        this.subviews.splice(this.subviews.indexOf(siblingSubview), 0, subview);
        this.containerObject.insertBefore(subview.nativeObject, siblingSubview.nativeObject)
    }

    public xtr_insertSubviewAboveSiblingSubview(subview: ViewElement, siblingSubview: ViewElement) {
        if (subview.superview !== undefined) { throw Error("subview has been added to another view.") }
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

}