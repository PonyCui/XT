/// <reference path="xtr.d.ts" />

import { View } from "./View";
import { Size, Rect, RectZero } from "../../interface/Rect";
import { ImageRenderingMode } from "../../interface/ImageView";
import { Releasable } from "../../interface/Releasable";

export class Image implements Releasable {

    retain(): this {
        XTMemoryManager_Retain(this.objectRef)
        return this
    }

    release(): this {
        XTMemoryManager_Release(this.objectRef)
        return this
    }

    addOwner(owner: any): this {
        xtrAddOwner(this, owner);
        return this;
    }

    static assetsPath = "assets/"

    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        XTRImage.xtr_fromURLSuccessFailure(url, (ref: string) => {
            if (success) {
                success(new Image(ref))
            }
        }, (message: string) => {
            failure && failure(new Error(message));
        });
    }

    static fromAssets(named: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        XTRImage.xtr_fromAssetsPathScalesSuccessFailure(named, this.assetsPath, [], (ref: string) => {
            if (success) {
                success(new Image(ref))
            }
        }, (message: string) => {
            failure && failure(new Error(message));
        });
    }

    static fromAssetsWithScales(named: string, scales: number[] | number, success: (image: Image) => void, failure?: (error: Error) => void) {
        XTRImage.xtr_fromAssetsPathScalesSuccessFailure(named, this.assetsPath, typeof scales === "number" ? [scales] : scales, (ref: string) => {
            if (success) {
                success(new Image(ref))
            }
        }, (message: string) => {
            failure && failure(new Error(message));
        });
    }

    static fromBase64(value: string, scale: number, success: (image: Image) => void) {
        XTRImage.xtr_fromBase64ScaleSuccess(value, scale, (ref: string) => {
            if (success) {
                success(new Image(ref))
            }
        });
    }

    objectRef: any;

    constructor(objectRef: any) {
        this.objectRef = objectRef;
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

    constructor(rect?: Rect, _isChild: boolean = false) {
        super(undefined, true);
        if (_isChild) { return; }
        this.objectRef = XTRImageView.createScriptObject(rect || RectZero, this);
        objectRefs[this.objectRef] = this;
        setImmediate(() => { this.init(); });
    }

    private _image?: Image;

    public get image(): Image | undefined {
        return this._image;
    }

    public set image(value: Image | undefined) {
        this._image = value;
        this.nativeObject.xtr_setImage(value);
    }

}