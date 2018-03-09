/// <reference path="xtr.d.ts" />

import { View } from "./View";
import { Size, Rect, RectZero } from "../interface/Rect";
import { ImageRenderingMode } from "../interface/ImageView";

export class Image extends XT.BaseObject {

    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        _XTUIImage.xtr_fromURLSuccessFailure(url, (ref: string) => {
            if (success) {
                success(new Image(ref))
            }
        }, (message: string) => {
            failure && failure(new Error(message));
        });
    }

    static fromBase64(value: string, scale: number): Image | undefined {
        const imageRef = _XTUIImage.xtr_fromBase64Scale(value, scale);
        return typeof imageRef === "string" ? new Image(imageRef) : undefined
    }

    objectRef: any;

    constructor(objectRef: any) {
        super(undefined, false)
        if (objectRefs[this.objectRef]) {
            return objectRefs[this.objectRef]
        }
        this.objectRef = objectRef;
        objectRefs[this.objectRef] = this;
    }

    toObject(): any {
        return {
            class: "UI.Image",
            size: this.size,
            renderingMode: this.renderingMode,
        }
    }

    public get size(): Size {
        return _XTUIImage.xtr_size(this.objectRef)
    }

    public get scale(): number {
        return _XTUIImage.xtr_scale(this.objectRef)
    }

    public get renderingMode(): ImageRenderingMode {
        return _XTUIImage.xtr_renderingMode(this.objectRef)
    }

    public imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image {
        return new Image(_XTUIImage.xtr_imageWithImageRenderingModeObjectRef(renderingMode, this.objectRef))
    }

}

export enum ContentMode {
    ScaleToFill,
    ScaleAspectFit,
    ScaleAspectFill,
}

export class ImageView extends View {

    constructor(ref: any) {
        super(ref || _XTUIImageView)
    }

    toObject(): any {
        return {
            ...super.toObject(), 
            class: "UI.ImageView",
            image: this.image,
        }
    }

    public get image(): Image | undefined {
        const ref = _XTUIImageView.xtr_image(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new Image(ref);
    }

    public set image(value: Image | undefined) {
        _XTUIImageView.xtr_setImageObjectRef(value ? value.objectRef : undefined, this.objectRef);
    }

    public loadImage(url: string, fadeIn: boolean = true): void {
        _XTUIImageView.xtr_loadImageFadeInObjectRef(url, fadeIn, this.objectRef)
    }

}