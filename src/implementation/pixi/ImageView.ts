import { Screen } from '../../interface/Screen';
import { View } from "./View";
import { Size } from "../../interface/Rect";
import { setNeedsDisplay, displayInterval } from "./Application";
import { ImageRenderingMode, ContentMode } from "../../interface/ImageView";
import * as PIXI from 'pixi.js'

const imageLoader = new PIXI.loaders.Loader();
let runningQueue: { url: string, success: (image: Image) => void, failure?: (error: Error) => void }[] = [];
let imageQueue: { url: string, success: (image: Image) => void, failure?: (error: Error) => void }[] = [];
let imageLoaderTimerHandler: number = 0;

export class Image {

    readonly size: Size;
    readonly scale: number;
    readonly baseTexture: any;
    readonly renderingMode: ImageRenderingMode = ImageRenderingMode.Original;

    static assetsPath = "assets/"

    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        imageQueue.push({ url, success, failure });
        this.loadImage();
    }

    static fromAssets(named: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        if (named.indexOf(".") < 0) {
            named = named + ".png"
        }
        this.fromURL(this.assetsPath + named, success, failure);
    }

    static fromAssetsWithScales(named: string, scales: number[] | number, success: (image: Image) => void, failure?: (error: Error) => void) {
        let target = 1;
        if (scales instanceof Array) {
            for (let index = 0; index < scales.length; index++) {
                let scale = scales[index];
                if (scale === Screen.mainScreen().scale) {
                    target = scale;
                    break;
                }
                else {
                    target = scale;
                }
            }
        }
        else {
            target = scales
        }
        if (target == 1) {
            return this.fromAssets(named + ".png", success, failure)
        }
        return this.fromAssets(named + "@" + target + "x.png", success, failure);
    }

    static fromBase64(value: string, scale: number, success: (image: Image) => void) {
        const baseTexture = PIXI.BaseTexture.fromImage("data:image/png;base64," + value);
        if (baseTexture) {
            success(new Image(baseTexture, { width: baseTexture.realWidth / scale, height: baseTexture.realHeight / scale }, scale, ImageRenderingMode.Original));
        }
    }

    static loadImage() {
        clearImmediate(imageLoaderTimerHandler);
        imageLoaderTimerHandler = setImmediate(() => {
            if (imageQueue.length == 0) { return; }
            runningQueue = imageQueue;
            imageQueue = [];
            runningQueue.forEach((item) => {
                try {
                    imageLoader.add(item.url, item.url);
                } catch (error) {

                }
            })
            imageLoader.load((_: any, res: { [key: string]: any }) => {
                for (const url in res) {
                    const value = res[url];
                    const image = new Image(value.texture.baseTexture, { width: value.texture.baseTexture.width, height: value.texture.baseTexture.height }, value.texture.baseTexture.resolution, ImageRenderingMode.Original);
                    runningQueue.forEach(item => {
                        if (item.url == url) {
                            item.success(image);
                        }
                    });
                }
            });
        })
    }

    constructor(baseTexture: any, size: Size, scale: number, renderingMode: ImageRenderingMode) {
        this.baseTexture = baseTexture;
        this.size = size;
        this.scale = scale;
        this.renderingMode = renderingMode;
    }

    imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image {
        return new Image(this.baseTexture, this.size, this.scale, renderingMode);
    }

}

export class ImageView extends View {

    private _image: Image | undefined = undefined;
    private imageObject: any = undefined;

    public get image(): Image | undefined {
        return this._image;
    }

    public set image(value: Image | undefined) {
        this._image = value;
        this.drawImage();
    }

    private _contentMode: ContentMode = ContentMode.ScaleToFill;

    public get contentMode(): ContentMode {
        return this._contentMode
    }

    public set contentMode(value: ContentMode) {
        if (this._contentMode === value) { return; }
        this._contentMode = value;
        this.resetImageBounds();
    }

    layoutSubviews() {
        super.layoutSubviews();
        if (this.imageObject) {
            this.resetImageBounds();
        }
    }

    private drawImage() {
        if (this.imageObject !== undefined && this.imageObject.parent !== undefined) {
            this.imageObject.parent.removeChild(this.imageObject);
        }
        if (this.image) {
            const image = this.image;
            this.imageObject = PIXI.Sprite.from(image.baseTexture);
            if (this.image.renderingMode === ImageRenderingMode.Template) {
                this.imageObject.tint = this.tintColor.rgbHexNumber(); // todo
            }
            this.resetImageBounds();
            this.nativeObject.addChildAt(this.imageObject, 1);
            setNeedsDisplay(this);
            displayInterval(300);
        }
    }

    private resetImageBounds() {
        if (this.imageObject && this.image && this.image.size.width > 0 && this.image.size.height > 0 && this.bounds.width > 0 && this.bounds.height > 0) {
            switch (this.contentMode) {
                case ContentMode.ScaleToFill:
                    this.imageObject.width = Screen.withScale(this.bounds.width);
                    this.imageObject.height = Screen.withScale(this.bounds.height);
                    break;
                case ContentMode.ScaleAspectFit:
                case ContentMode.ScaleAspectFill:
                    const imageRatio = this.image.size.width / this.image.size.height;
                    const viewRatio = this.bounds.width / this.bounds.height;
                    if ((imageRatio > viewRatio && this.contentMode === ContentMode.ScaleAspectFit) || (imageRatio < viewRatio && this.contentMode === ContentMode.ScaleAspectFill)) {
                        this.imageObject.width = Screen.withScale(this.bounds.width);
                        this.imageObject.height = Screen.withScale(this.bounds.width) / this.image.size.width * this.image.size.height;
                        this.imageObject.x = 0.0;
                        this.imageObject.y = (Screen.withScale(this.bounds.height) - this.imageObject.height) / 2.0;
                    }
                    else if ((imageRatio < viewRatio && this.contentMode === ContentMode.ScaleAspectFit) || (imageRatio > viewRatio && this.contentMode === ContentMode.ScaleAspectFill)) {
                        this.imageObject.width = Screen.withScale(this.bounds.height) / this.image.size.height * this.image.size.width;
                        this.imageObject.height = Screen.withScale(this.bounds.height);
                        this.imageObject.x = (Screen.withScale(this.bounds.width) - this.imageObject.width) / 2.0;
                        this.imageObject.y = 0.0;
                    }
                    break;
            }

        }
        setNeedsDisplay(this);
    }

}