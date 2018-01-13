export class Font {

    readonly familyName?: string;
    readonly pointSize: number;
    readonly fontWeight: string = '400';
    readonly fontStyle: string = 'normal';

    constructor(pointSize: number, fontWeight: string = '400', fontStyle: string = 'normal', familyName?: string) {
        this.pointSize = pointSize;
        this.fontWeight = fontWeight;
        this.fontStyle = fontStyle;
        this.familyName = familyName;
    }

    static systemFontOfSize(pointSize: number, weight: string = '400'): Font {
        return new Font(pointSize, weight);
    }

    static boldSystemFontOfSize(pointSize: number): Font {
        return new Font(pointSize, '700')
    }

    static italicSystemFontOfSize(pointSize: number): Font {
        return new Font(pointSize, '400', 'italic')
    }

}