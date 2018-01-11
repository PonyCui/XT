export class Font {

    objectRef: any

    constructor(pointSize_ref: number | string, fontWeight: string = '400', fontStyle: string = 'normal', familyName?: string) {
        if (typeof pointSize_ref === "string") {
            this.objectRef = pointSize_ref
        }
        else {
            this.objectRef = XTRFont.create(pointSize_ref, fontWeight, fontStyle, familyName)
        }
    }

    public get familyName(): string | undefined {
        const value = XTRFont.xtr_familyName(this.objectRef)
        return typeof value === "string" ? value : undefined
    }
    
    public get pointSize(): number {
        return XTRFont.xtr_pointSize(this.objectRef)
    }

    public get fontWeight(): string {
        return XTRFont.xtr_fontWeight(this.objectRef)
    }

    public get fontStyle(): string {
        return XTRFont.xtr_fontStyle(this.objectRef)
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