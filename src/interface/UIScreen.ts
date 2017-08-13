import { CGRect } from './CGRect'

export class UIScreen {

    static mainScreen: () => UIScreen = () => new UIScreen(0, 0, 1)

    readonly width: number;
    readonly height: number;
    readonly scale: number;

    constructor(width: number, height: number, scale: number) {
        this.width = width;
        this.height = height;
        this.scale = scale;
    }

    bounds(): CGRect {
        return { x: 0, y: 0, width: this.width, height: this.height }
    }

}