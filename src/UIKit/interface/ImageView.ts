import { View } from "./View";
import { Size, Rect } from "./Rect";

export enum ImageRenderingMode {
    Automatic = 0,
    Original = 1,
    Template = 2,
}

export class Image extends XT.BaseObject {

    readonly size: Size;
    readonly scale: number;
    readonly renderingMode: ImageRenderingMode = ImageRenderingMode.Original;

    static fromSource(localPath: string): Image { throw Error("Not Implemented.") }

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