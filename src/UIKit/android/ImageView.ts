import { View } from "./View";
import { Size, Rect, RectZero } from "../interface/Rect";
import { Releasable } from "../interface/Releasable";

export enum ImageRenderingMode {
    Automatic = 0,
    Original = 1,
    Template = 2,
}

export class Image implements Releasable {

    retain(): this {
        _XTRetain(this.objectRef)
        return this
    }
    release(): this {
        _XTRelease(this.objectRef)
        return this
    }

    constructor(public objectRef: any) { }

    readonly size: Size;
    readonly scale: number;
    readonly renderingMode: ImageRenderingMode = ImageRenderingMode.Original;

    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        _XTUIImage.xtr_fromURL(url, (imageRef?: string) => {
            if (typeof imageRef === "string") {
                success(new Image(imageRef))
            }
        }, () => {
            if (failure) {
                failure(new Error())
            }
        })
    }

    static fromBase64(value: string, scale: number): Image | undefined {
        const imageRef = _XTUIImage.xtr_fromBase64(value, scale)
        return typeof imageRef === "string" ? new Image(imageRef) : undefined
    }

    imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image {
        const imageRef = _XTUIImage.xtr_imageWithImageRenderingMode(this.objectRef, renderingMode)
        if (typeof imageRef === "string") {
            return new Image(imageRef)
        }
        return this;
    }

}

export enum ContentMode {
    ScaleToFill,
    ScaleAspectFit,
    ScaleAspectFill,
}

export class ImageView extends View {

    constructor(ref?: any) {
        super(ref || _XTUIImageView)
    }

    public get image(): Image | undefined {
        const imageRef = _XTUIImageView.xtr_image(this.objectRef)
        return typeof imageRef === "string" ? new Image(imageRef) : undefined;
    }

    public set image(value: Image | undefined) {
        _XTUIImageView.xtr_setImage(value ? value.objectRef : "", this.objectRef);
        this.recursiveSetNeedLayout()
    }

    public get contentMode(): ContentMode {
        return _XTUIImageView.xtr_contentMode(this.objectRef);
    }

    public set contentMode(value: ContentMode) {
        _XTUIImageView.xtr_setContentMode(value, this.objectRef);
    }

    public intrinsicContentSize(width?: number): Size | undefined {
        if (this.image) {
            return this.image.size
        }
        return super.intrinsicContentSize(width)
    }

}