export class TransformMatrix {

    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;

    constructor(a: number, b: number, c: number, d: number, tx: number, ty: number) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }

}