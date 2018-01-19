/// <reference path="xtr.d.ts" />

import { View } from "./View";
import { Size, Rect, RectZero, SizeMake } from "../../interface/Rect";
import { ImageRenderingMode } from "../../interface/ImageView";
import { ImageViewElement } from "./element/ImageView";
import { Releasable } from "../../interface/Releasable";

const scaleOptions = [3, 2]

export class Image implements Releasable {

    retain(): this {
        return this
    }

    release(): this {
        return this
    }

    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        const request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.responseType = "arraybuffer"
        request.onload = (e) => {
            if (request.status < 400 && request.readyState == 4) {
                const blob = new Blob([request.response]);
                const url = URL.createObjectURL(blob);
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
                    const size = SizeMake(imgElement.width / scale, imgElement.height / scale)
                    const image = new Image(url, size, scale);
                    success(image)
                }
                imgElement.src = url;
            }
            else {
                failure && failure(Error("Image load failure code " + request.status))
            }
        }
        request.send();
    }

    static fromBase64(value: string, scale: number, bitmapWidth: number = 0, bitmapHeight: number = 0): Image | undefined {
        if (value.indexOf('base64,') >= 0) {
            value = value.split('base64,')[1];
        }
        const blob = new Blob([this._base64ToArrayBuffer(value)]);
        const url = URL.createObjectURL(blob);
        const imgElement = document.createElement('img');
        imgElement.src = url;
        return new Image(url, SizeMake((bitmapWidth || 0.0) / scale, (bitmapHeight || 0.0) / scale), scale)
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

    constructor(
        readonly URLString: string,
        readonly size: Size = { width: 0, height: 0 },
        readonly scale: number = 1.0,
        readonly renderingMode: ImageRenderingMode = ImageRenderingMode.Original) { }

    public imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image {
        return new Image(this.URLString, this.size, this.scale, renderingMode)
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
    }

    private _image?: Image;

    public get image(): Image | undefined {
        return this._image;
    }

    public set image(value: Image | undefined) {
        this._image = value;
        this.nativeObject.xtr_setImage(value);
    }

    public intrinsicContentSize(width?: number): Size | undefined {
        if (this.image) {
            return this.image.size
        }
        return super.intrinsicContentSize(width)
    }

}