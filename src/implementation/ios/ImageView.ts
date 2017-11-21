/// <reference path="xtr.d.ts" />

import { View } from "./View";
import { Size, Rect, RectZero } from "../../interface/Rect";
import { ImageRenderingMode } from "../../interface/ImageView";

export class Image {

    static assetsPath = "assets/"

    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        XTRImage.xtr_fromURLSuccessFailure(url, success, (message: string) => {
            failure && failure(new Error(message));
        });
    }

    static fromAssets(named: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        XTRImage.xtr_fromAssetsPathScalesSuccessFailure(named, this.assetsPath, [], success, (message: string) => {
            failure && failure(new Error(message));
        });
    }

    static fromAssetsWithScales(named: string, scales: number[] | number, success: (image: Image) => void, failure?: (error: Error) => void) {
        XTRImage.xtr_fromAssetsPathScalesSuccessFailure(named, this.assetsPath, scales, success, (message: string) => {
            failure && failure(new Error(message));
        });
    }

    static fromBase64(value: string, scale: number, success: (image: Image) => void) {
        XTRImage.xtr_fromBase64ScaleSuccess(value, scale, success);
    }

    public nativeObject: any;

    constructor(nativeObject?: any) {
        this.nativeObject = nativeObject;
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
        return this.nativeObject.xtr_imageWithImageRenderingMode(renderingMode);
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
        this.nativeObject = XTRImageView.createScriptObject(rect || RectZero, this);
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