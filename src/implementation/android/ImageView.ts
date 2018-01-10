import { View } from "./View";
import { Size, Rect, RectZero } from "../../interface/Rect";
import { Releasable } from "../../interface/Releasable";

export enum ImageRenderingMode {
    Automatic = 0,
    Original = 1,
    Template = 2,
}

export class Image implements Releasable {

    retain(): this {
        XTMemoryManager.retain(this.objectRef)
        return this
    }
    release(): this {
        XTMemoryManager.release(this.objectRef)
        return this
    }

    constructor(public objectRef: any) { }

    readonly size: Size;
    readonly scale: number;
    readonly renderingMode: ImageRenderingMode = ImageRenderingMode.Original;

    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        XTRImage.xtr_fromURL(url, (imageRef?: string) => {
            if (typeof imageRef === "string") {
                success(new Image(imageRef))
            }
        }, () => {
            if (failure) {
                failure(new Error())
            }
        })
    }

    static fromAssets(named: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        XTRImage.xtr_fromAssets(named, (imageRef?: string) => {
            if (typeof imageRef === "string") {
                success(new Image(imageRef))
            }
        }, () => {
            if (failure) {
                failure(new Error())
            }
        })
    }

    static fromBase64(value: string, scale: number, success: (image: Image) => void) {
        XTRImage.xtr_fromBase64(value, scale, (imageRef?: string) => {
            if (typeof imageRef === "string") {
                success(new Image(imageRef))
            }
        })
    }

    imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image {
        const imageRef =  XTRImage.xtr_imageWithImageRenderingMode(this.objectRef, renderingMode)
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

    nativeObject: any;

    constructor() {
        super(XTRImageView)
    }

    public get image(): Image | undefined {
        return this.nativeObject.xtr_image();
    }

    public set image(value: Image | undefined) {
        this.nativeObject.xtr_setImage(value);
        this.recursiveSetNeedLayout()
    }

    public get contentMode(): ContentMode {
        return this.nativeObject.xtr_contentMode();
    }

    public set contentMode(value: ContentMode) {
        this.nativeObject.xtr_setContentMode(value);
    }

    public intrinsicContentSize(width?: number): Size | undefined {
        if (this.image) {
            return this.image.size
        }
        return super.intrinsicContentSize(width)
    }

}