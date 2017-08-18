import { Screen } from '../../interface/Screen';
import { View } from "./View";
import { Size } from "../../interface/Rect";
import { setNeedsDisplay, displayInterval } from "./Application";
const PIXI = (window as any).PIXI

const imageLoader = new PIXI.loaders.Loader();
let runningQueue: { url: string, success: (image: Image) => void, failure: (error: Error) => void }[] = [];
let imageQueue: { url: string, success: (image: Image) => void, failure: (error: Error) => void }[] = [];
let imageLoaderTimerHandler: number = 0;

export class Image {

    readonly size: Size;
    readonly scale: number;
    readonly baseTexture: any;

    static assetsPath = "./assets/"

    static fromURL(url: string, success: (image: Image) => void, failure: (error: Error) => void) {
        imageQueue.push({ url, success, failure });
        this.loadImage();
    }

    static fromAssets(named: string, success: (image: Image) => void, failure: (error: Error) => void) {
        this.fromURL(this.assetsPath + named, success, failure);
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
                    const image = new Image(value.texture.baseTexture, { width: value.texture.baseTexture.width, height: value.texture.baseTexture.height }, value.texture.baseTexture.resolution);
                    runningQueue.forEach(item => {
                        if (item.url == url) {
                            item.success(image);
                        }
                    });
                }
            });
        })
    }

    private constructor(baseTexture: any, size: Size, scale: number) {
        this.baseTexture = baseTexture;
        this.size = size;
        this.scale = scale;
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

    layoutSubviews() {
        super.layoutSubviews();
        if (this.imageObject) {
            this.imageObject.width = Screen.withScale(this.bounds.width);
            this.imageObject.height = Screen.withScale(this.bounds.height);
        }
    }

    private drawImage() {
        if (this.imageObject !== undefined && this.imageObject.parent !== undefined) {
            this.imageObject.parent.removeChild(this.imageObject);
        }
        if (this.image) {
            const image = this.image;
            this.imageObject = PIXI.Sprite.from(image.baseTexture);
            this.imageObject.width = Screen.withScale(this.bounds.width);
            this.imageObject.height = Screen.withScale(this.bounds.height);
            this.nativeObject.addChildAt(this.imageObject, 1);
            setNeedsDisplay(this);
            displayInterval(1000);
        }
    }

}