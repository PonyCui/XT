/// <reference path="xtr.d.ts" />
import { Rect } from "../../interface/Rect";

export class Screen {

    static mainScreen: () => Screen = () => {
        return new Screen(document.body.clientWidth, document.body.clientHeight, window.devicePixelRatio);
    }

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