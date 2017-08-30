/// <reference path="xtr.d.ts" />

export class Font {

    private nativeObject: any;

    constructor(pointSize: number, fontWeight: string = '400', fontStyle: string = 'normal', familyName?: string, nativeObject?: any) {
        if (nativeObject) {
            this.nativeObject = nativeObject;
        }
        else {
            this.nativeObject = XTRFont.createFontWeightFontStyleFamilyName(pointSize, fontWeight, fontStyle, familyName || "");
        }
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
        return this.nativeObject.xtr_familyName()
    }
    
    public get pointSize(): number {
        return this.nativeObject.xtr_pointSize()
    }

    public get fontWeight(): string {
        return this.nativeObject.xtr_fontWeight();
    }

    public get fontStyle(): string {
        return this.nativeObject.xtr_fontStyle();
    }

}

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.constructor.toString() === "[object XTRFontConstructor]") {
        return new Font(0, undefined, undefined, undefined, view);
    }
    return undefined;
})