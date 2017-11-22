import { View } from "./View";
import { Size } from "./Rect";
import { Releasable } from "./Releasable";

export enum ImageRenderingMode {
    Automatic = 0,
    Original = 1,
    Template = 2,
}

export class Image implements Releasable {
    
    addOwner(owner: any): this {
        return this
    }

    readonly size: Size;
    readonly scale: number;
    readonly renderingMode: ImageRenderingMode = ImageRenderingMode.Original;

    static assetsPath = "./assets/"

    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void) { }

    static fromAssets(named: string, success: (image: Image) => void, failure?: (error: Error) => void) { }

    static fromAssetsWithScales(named: string, scales: number[] | number, success: (image: Image) => void, failure?: (error: Error) => void) { }

    static fromBase64(value: string, scale: number, success: (image: Image) => void) { }

    imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image {
        throw "Not Implemented."
    }

}

export enum ContentMode {
    ScaleToFill,
    ScaleAspectFit,
    ScaleAspectFill,
}

export class ImageView extends View {

    image?: Image;
    contentMode: ContentMode = ContentMode.ScaleToFill;

}