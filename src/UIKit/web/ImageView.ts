/// <reference path="xtr.d.ts" />

import { View } from "./View";
import { Size, Rect, RectZero, SizeMake } from "../interface/Rect";
import { ImageRenderingMode } from "../interface/ImageView";
import { ImageViewElement } from "./element/ImageView";

const scaleOptions = [3, 2]

export class Image extends XT.BaseObject {

    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        const imgElement = document.createElement('img');
        imgElement.onload = () => {
            const scale = (function (url) {
                if (url.indexOf('@2x')) {
                    return 2.0;
                }
                else if (url.indexOf('@3x')) {
                    return 3.0;
                }
                else {
                    return 1.0;
                }
            })(url)
            const image = new Image(imgElement, scale);
            success(image)
        }
        imgElement.src = url
    }

    static fromBase64(value: string, scale: number, bitmapWidth: number = 0, bitmapHeight: number = 0): Image | undefined {
        if (value.indexOf('base64,') >= 0) {
            value = value.split('base64,')[1];
        }
        const blob = new Blob([this._base64ToArrayBuffer(value)]);
        const url = URL.createObjectURL(blob);
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.width = bitmapWidth
        imgElement.height = bitmapHeight
        return new Image(imgElement, scale)
    }

    private static _base64ToArrayBuffer(base64: string) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    URLString: string
    size: Size

    constructor(readonly source: HTMLImageElement, readonly scale: number = 1.0, readonly renderingMode: ImageRenderingMode = ImageRenderingMode.Original) {
        super()
        this.URLString = source.src
        this.size = SizeMake(source.width / scale, source.height / scale)
    }

    toObject(): any {
        return {
            class: "UI.Image",
            size: this.size,
            renderingMode: this.renderingMode,
        }
    }

    clone(): Image {
        const imgElement = document.createElement('img')
        imgElement.src = this.source.src
        return new Image(imgElement, this.scale, this.renderingMode)
    }

    public imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image {
        return new Image(this.source, this.scale, renderingMode)
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
        super(ImageViewElement)
        this.userInteractionEnabled = false
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.ImageView",
            image: this.image,
        }
    }

    private _image?: Image;

    public get image(): Image | undefined {
        return this._image;
    }

    public set image(value: Image | undefined) {
        this._image = value;
        this.nativeObject.xtr_setImage(value ? value.clone() : undefined);
    }

    public tintColorDidChange() {
        super.tintColorDidChange()
        this.nativeObject.resetTintColor()
    }

    public intrinsicContentSize(width?: number): Size | undefined {
        if (this.image) {
            return this.image.size
        }
        return super.intrinsicContentSize(width)
    }

    public loadImage(url: string, fadeIn: boolean = true): void {
        this.nativeObject.xtr_loadImage(url, fadeIn)
    }

}