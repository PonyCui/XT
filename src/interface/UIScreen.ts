import { CGRect } from './CGRect'

export class UIScreen {

    static mainScreen: () => UIScreen = () => new UIScreen(0, 0)

    readonly width: number;
    readonly height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    bounds(): CGRect {
        return { x: 0, y: 0, width: this.width, height: this.height }
    }

}