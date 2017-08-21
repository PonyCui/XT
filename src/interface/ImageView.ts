import { View } from "./View";
import { Size } from "./Rect";

export class Image {

    readonly size: Size;
    readonly scale: number;

    static assetsPath = "./assets/"

    static fromURL(url: string, success: (image: Image) => void, failure: (error: Error) => void) { }

    static fromAssets(named: string, success: (image: Image) => void, failure: (error: Error) => void) { }

    static fromAssetsWithScales(named: string, scales: number[] | number, success: (image: Image) => void, failure: (error: Error) => void) { }

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