/// <reference path="xtr.d.ts" />

export class Font {

    nativeObjectRef: any;

    public set nativeObject(value: any) { }

    public get nativeObject(): any {
        return xtrRequestNativeObject(this.nativeObjectRef);
    }

    constructor(pointSize: number, fontWeight: string = '400', fontStyle: string = 'normal', familyName?: string) {
        this.nativeObjectRef = XTRFont.createFontWeightFontStyleFamilyName(pointSize, fontWeight, fontStyle, familyName || "");
        objectRefs[this.nativeObjectRef] = this;
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