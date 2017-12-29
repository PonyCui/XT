/// <reference path="xtr.d.ts" />

export class Font {

    objectRef: any;

    constructor(pointSize: number | string, fontWeight: string = '400', fontStyle: string = 'normal', familyName?: string) {
        if (typeof pointSize === "string") {
            this.objectRef = pointSize;
            objectRefs[this.objectRef] = this;
            return 
        }
        this.objectRef = XTRFont.createFontWeightFontStyleFamilyName(pointSize, fontWeight, fontStyle, familyName || "");
        objectRefs[this.objectRef] = this;
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

    public get familyName(): string | undefined {
        return XTRFont.xtr_familyName(this.objectRef)
    }

    public get pointSize(): number {
        return XTRFont.xtr_pointSize(this.objectRef)
    }

    public get fontWeight(): string {
        return XTRFont.xtr_fontWeight(this.objectRef);
    }

    public get fontStyle(): string {
        return XTRFont.xtr_fontStyle(this.objectRef);
    }

}