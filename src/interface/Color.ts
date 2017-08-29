
export class Color {

    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;

    constructor(r: number, g: number, b: number, a?: number) {
        this.r = Math.min(1.0, Math.max(0.0, r));
        this.g = Math.min(1.0, Math.max(0.0, g));;
        this.b = Math.min(1.0, Math.max(0.0, b));;
        this.a = a == undefined ? 1.0 : Math.min(1.0, Math.max(0.0, a));;
    }

    rgbHexNumber(): number {
        const r = Math.ceil(this.r * 255).toString(16);
        const g = Math.ceil(this.g * 255).toString(16);
        const b = Math.ceil(this.b * 255).toString(16);
        return parseInt("0x" + (r.length < 2 ? "0" + r : r) + (g.length < 2 ? "0" + g : g) + (b.length < 2 ? "0" + b : b));
    }

    rgbHexString(): string {
        const r = Math.ceil(this.r * 255).toString(16);
        const g = Math.ceil(this.g * 255).toString(16);
        const b = Math.ceil(this.b * 255).toString(16);
        return "#" + (r.length < 2 ? "0" + r : r) + (g.length < 2 ? "0" + g : g) + (b.length < 2 ? "0" + b : b);
    }

    equals(toColor: Color | undefined) {
        if (toColor instanceof Color) {
            return this.r === toColor.r && this.g === toColor.g && this.b === toColor.b && this.a === toColor.a;
        }
        return false;
    }

    static whiteColor: Color = new Color(1.0, 1.0, 1.0)
    static blackColor: Color = new Color(0.0, 0.0, 0.0)
    static clearColor: Color = new Color(0.0, 0.0, 0.0, 0.0)
    static redColor: Color = new Color(1.0, 0.0, 0.0)
    static yellowColor: Color = new Color(1.0, 1.0, 0.0)
    static greenColor: Color = new Color(0.0, 1.0, 0.0)
    static blueColor: Color = new Color(0.0, 0.0, 1.0)

}
