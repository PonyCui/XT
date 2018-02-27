import { View } from "./View";
import { Size, Rect } from "./Rect";
import { Releasable } from "./Releasable";

export enum ImageRenderingMode {
    Automatic = 0,
    Original = 1,
    Template = 2,
}

export class Image implements Releasable {

    retain(): this {
        throw new Error("Method not implemented.");
    }
    release(): this {
        throw new Error("Method not implemented.");
    }

    readonly size: Size;
    readonly scale: number;
    readonly renderingMode: ImageRenderingMode = ImageRenderingMode.Original;

    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void) { }

    static fromBase64(value: string, scale: number): Image | undefined { return undefined }

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
    loadImage(url: string, fadeIn: boolean = true): void { }

}