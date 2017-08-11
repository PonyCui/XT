
export class UIColor {

    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;

    constructor(r: number, g: number, b: number, a?: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a || 1.0;
    }

    rgbHexNumber(): number {
        const r = Math.ceil(this.r * 255).toString(16);
        const g = Math.ceil(this.g * 255).toString(16);
        const b = Math.ceil(this.b * 255).toString(16);
        return parseInt("0x" + (r.length < 2 ? "0" + r : r) + (g.length < 2 ? "0" + g : g) + (b.length < 2 ? "0" + b : b));
    }

}
