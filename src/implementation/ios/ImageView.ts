/// <reference path="xtr.d.ts" />

import { View } from "./View";
import { Size, Rect, RectZero } from "../../interface/Rect";
import { ImageRenderingMode } from "../../interface/ImageView";
import { Releasable } from "../../interface/Releasable";

export class Image implements Releasable {

    retain(): this {
        XTRetain(this.objectRef)
        return this
    }

    release(): this {
        XTRelease(this.objectRef)
        return this
    }

    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        XTRImage.xtr_fromURLSuccessFailure(url, (ref: string) => {
            if (success) {
                success(new Image(ref))
            }
        }, (message: string) => {
            failure && failure(new Error(message));
        });
    }

    static fromBase64(value: string, scale: number): Image | undefined {
        const imageRef = XTRImage.xtr_fromBase64Scale(value, scale);
        return typeof imageRef === "string" ? new Image(imageRef) : undefined
    }

    objectRef: any;

    constructor(objectRef: any) {
        if (objectRefs[this.objectRef]) {
            return objectRefs[this.objectRef]
        }
        this.objectRef = objectRef;
        objectRefs[this.objectRef] = this;
    }

    public get size(): Size {
        return XTRImage.xtr_size(this.objectRef)
    }

    public get scale(): number {
        return XTRImage.xtr_scale(this.objectRef)
    }

    public get renderingMode(): ImageRenderingMode {
        return XTRImage.xtr_renderingMode(this.objectRef)
    }

    public imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image {
        return new Image(XTRImage.xtr_imageWithImageRenderingModeObjectRef(renderingMode, this.objectRef))
    }

}

export enum ContentMode {
    ScaleToFill,
    ScaleAspectFit,
    ScaleAspectFill,
}

export class ImageView extends View {

    constructor(ref: any) {
        super(ref || XTRImageView)
    }

    public get image(): Image | undefined {
        const ref = XTRImageView.xtr_image(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new Image(ref);
    }

    public set image(value: Image | undefined) {
        XTRImageView.xtr_setImageObjectRef(value ? value.objectRef : undefined, this.objectRef);
    }

}