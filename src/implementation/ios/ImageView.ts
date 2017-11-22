/// <reference path="xtr.d.ts" />

import { View } from "./View";
import { Size, Rect, RectZero } from "../../interface/Rect";
import { ImageRenderingMode } from "../../interface/ImageView";
import { Releasable } from "../../interface/Releasable";

export class Image implements Releasable {

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
        XTRImage.xtr_fromAssetsPathScalesSuccessFailure(named, this.assetsPath, scales, (ref: string) => {
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

    nativeObjectRef: any;

    public set nativeObject(value: any) { }

    public get nativeObject(): any {
        return xtrRequestNativeObject(this.nativeObjectRef);
    }

    constructor(nativeObjectRef: any) {
        this.nativeObjectRef = nativeObjectRef;
    }

    public get size(): Size {
        return this.nativeObject.xtr_size();
    }

    public get scale(): number {
        return this.nativeObject.xtr_scale();
    }

    public get renderingMode(): ImageRenderingMode {
        return this.nativeObject.xtr_renderingMode();
    }

    public imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image {
        return new Image(this.nativeObject.xtr_imageWithImageRenderingMode(renderingMode));
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
        this.nativeObjectRef = XTRImageView.createScriptObject(rect || RectZero, this);
        objectRefs[this.nativeObjectRef] = this;
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