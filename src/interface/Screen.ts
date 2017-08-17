import { Rect } from './Rect'

export class Screen {

    static mainScreen: () => Screen = () => new Screen(0, 0, 1)

    readonly width: number;
    readonly height: number;
    readonly scale: number;

    constructor(width: number, height: number, scale: number) {
        this.width = width;
        this.height = height;
        this.scale = scale;
    }

    bounds(): Rect {
        return { x: 0, y: 0, width: this.width, height: this.height }
    }

    static withScale(value: number): number {
        return value * Screen.mainScreen().scale;
    }

    static outScale(value: number): number {
        return value / Screen.mainScreen().scale;
    }

}