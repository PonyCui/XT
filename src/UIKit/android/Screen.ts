import { Rect } from "../interface/Rect";

export class Screen {

    private static screenInfo?: { width: number, height: number, scale: number } = undefined

    public static get mainScreen(): Screen {
        if (Screen.screenInfo === undefined) {
            Screen.screenInfo = _XTUIScreen.xtr_mainScreen() || { width: 0.0, height: 0.0, scale: 1.0 };
        }
        const screenInfo: any = Screen.screenInfo
        return new Screen(screenInfo.width, screenInfo.height, screenInfo.scale)
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
        return value * Screen.mainScreen.scale;
    }

    static outScale(value: number): number {
        return value / Screen.mainScreen.scale;
    }

}