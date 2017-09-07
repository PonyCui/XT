import { View } from "./View";
import { Size, Rect, RectZero } from "../../interface/Rect";

export enum ImageRenderingMode {
    Automatic = 0,
    Original = 1,
    Template = 2,
}

export class Image {

    readonly size: Size;
    readonly scale: number;
    readonly renderingMode: ImageRenderingMode = ImageRenderingMode.Original;

    static assetsPath = "./assets/"

    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        XTRImage.xtr_fromURL(url, success, failure)
    }

    static fromAssets(named: string, success: (image: Image) => void, failure?: (error: Error) => void) {
        this.fromAssetsWithScales(named, [], success, failure)
    }

    static fromAssetsWithScales(named: string, scales: number[] | number, success: (image: Image) => void, failure?: (error: Error) => void) {
        XTRImage.xtr_fromAssets(this.assetsPath + named, scales, success, failure)
    }

    imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image {
        throw "TODO"
    }

}

export enum ContentMode {
    ScaleToFill,
    ScaleAspectFit,
    ScaleAspectFill,
}

export class ImageView extends View {

    nativeObject: any;

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        super(undefined, undefined, true)
        if (_isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.nativeObject = XTRImageView.createScriptObject(rect || RectZero, this);
            (window as any).XTRObjCreater.store(this);
            this.init();
        }
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

}

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.toString().indexOf("com.opensource.xtruntime.XTRImageView$InnerObject") === 0) {
        return new ImageView(undefined, view);
    }
    return undefined;
})