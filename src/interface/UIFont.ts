export class UIFont {

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

    static systemFontOfSize(pointSize: number, weight: string = '400'): UIFont {
        return new UIFont(pointSize, weight);
    }

    static boldSystemFontOfSize(pointSize: number): UIFont {
        return new UIFont(pointSize, '700')
    }

    static italicSystemFontOfSize(pointSize: number): UIFont {
        return new UIFont(pointSize, '400', 'italic')
    }

}