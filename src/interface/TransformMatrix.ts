class TransformMatrixAlgorithm {

    props: number[] = []

    constructor() {
        this.props[0] = 1;
        this.props[1] = 0;
        this.props[2] = 0;
        this.props[3] = 0;
        this.props[4] = 0;
        this.props[5] = 1;
        this.props[6] = 0;
        this.props[7] = 0;
        this.props[8] = 0;
        this.props[9] = 0;
        this.props[10] = 1;
        this.props[11] = 0;
        this.props[12] = 0;
        this.props[13] = 0;
        this.props[14] = 0;
        this.props[15] = 1;
    }

    rotate(angle: number) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, -mSin, 0, 0
            , mSin, mCos, 0, 0
            , 0, 0, 1, 0
            , 0, 0, 0, 1);
    }

    rotateX(angle: number) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(1, 0, 0, 0
            , 0, mCos, -mSin, 0
            , 0, mSin, mCos, 0
            , 0, 0, 0, 1);
    }

    rotateY(angle: number) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, 0, mSin, 0
            , 0, 1, 0, 0
            , -mSin, 0, mCos, 0
            , 0, 0, 0, 1);
    }

    rotateZ(angle: number) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, -mSin, 0, 0
            , mSin, mCos, 0, 0
            , 0, 0, 1, 0
            , 0, 0, 0, 1);
    }

    shear(sx: number, sy: number) {
        return this._t(1, sy, sx, 1, 0, 0);
    }

    skew(ax: number, ay: number) {
        return this.shear(Math.tan(ax), Math.tan(ay));
    }

    skewFromAxis(ax: number, angle: number) {
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, mSin, 0, 0
            , -mSin, mCos, 0, 0
            , 0, 0, 1, 0
            , 0, 0, 0, 1)
        this._t(1, 0, 0, 0
            , Math.tan(ax), 1, 0, 0
            , 0, 0, 1, 0
            , 0, 0, 0, 1)
        this._t(mCos, -mSin, 0, 0
            , mSin, mCos, 0, 0
            , 0, 0, 1, 0
            , 0, 0, 0, 1);
        //return this._t(mCos, mSin, -mSin, mCos, 0, 0)._t(1, 0, Math.tan(ax), 1, 0, 0)._t(mCos, -mSin, mSin, mCos, 0, 0);
    }

    scale(sx: number, sy: number, sz: number) {
        sz = isNaN(sz) ? 1 : sz;
        if (sx == 1 && sy == 1 && sz == 1) {
            return this;
        }
        return this._t(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
    }

    setTransform(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) {
        this.props[0] = a;
        this.props[1] = b;
        this.props[2] = c;
        this.props[3] = d;
        this.props[4] = e;
        this.props[5] = f;
        this.props[6] = g;
        this.props[7] = h;
        this.props[8] = i;
        this.props[9] = j;
        this.props[10] = k;
        this.props[11] = l;
        this.props[12] = m;
        this.props[13] = n;
        this.props[14] = o;
        this.props[15] = p;
        return this;
    }

    translate(tx: number, ty: number, tz: number) {
        tz = isNaN(tz) ? 0 : tz;
        if (tx !== 0 || ty !== 0 || tz !== 0) {
            return this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1);
        }
        return this;
    }

    _t(a2?: number, b2?: number, c2?: number, d2?: number, e2?: number, f2?: number, g2?: number, h2?: number, i2?: number, j2?: number, k2?: number, l2?: number, m2?: number, n2?: number, o2?: number, p2?: number) {
        this.transform(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2)
    }

    transform(a2?: any, b2?: any, c2?: any, d2?: any, e2?: any, f2?: any, g2?: any, h2?: any, i2?: any, j2?: any, k2?: any, l2?: any, m2?: any, n2?: any, o2?: any, p2?: any) {

        if (a2 === 1 && b2 === 0 && c2 === 0 && d2 === 0 && e2 === 0 && f2 === 1 && g2 === 0 && h2 === 0 && i2 === 0 && j2 === 0 && k2 === 1 && l2 === 0) {
            if (m2 !== 0 || n2 !== 0 || o2 !== 0) {

                this.props[12] = this.props[12] * a2 + this.props[13] * e2 + this.props[14] * i2 + this.props[15] * m2;
                this.props[13] = this.props[12] * b2 + this.props[13] * f2 + this.props[14] * j2 + this.props[15] * n2;
                this.props[14] = this.props[12] * c2 + this.props[13] * g2 + this.props[14] * k2 + this.props[15] * o2;
                this.props[15] = this.props[12] * d2 + this.props[13] * h2 + this.props[14] * l2 + this.props[15] * p2;
            }
            return this;
        }

        var a1 = this.props[0];
        var b1 = this.props[1];
        var c1 = this.props[2];
        var d1 = this.props[3];
        var e1 = this.props[4];
        var f1 = this.props[5];
        var g1 = this.props[6];
        var h1 = this.props[7];
        var i1 = this.props[8];
        var j1 = this.props[9];
        var k1 = this.props[10];
        var l1 = this.props[11];
        var m1 = this.props[12];
        var n1 = this.props[13];
        var o1 = this.props[14];
        var p1 = this.props[15];

        /* matrix order (canvas compatible):
         * ace
         * bdf
         * 001
         */
        this.props[0] = a1 * a2 + b1 * e2 + c1 * i2 + d1 * m2;
        this.props[1] = a1 * b2 + b1 * f2 + c1 * j2 + d1 * n2;
        this.props[2] = a1 * c2 + b1 * g2 + c1 * k2 + d1 * o2;
        this.props[3] = a1 * d2 + b1 * h2 + c1 * l2 + d1 * p2;

        this.props[4] = e1 * a2 + f1 * e2 + g1 * i2 + h1 * m2;
        this.props[5] = e1 * b2 + f1 * f2 + g1 * j2 + h1 * n2;
        this.props[6] = e1 * c2 + f1 * g2 + g1 * k2 + h1 * o2;
        this.props[7] = e1 * d2 + f1 * h2 + g1 * l2 + h1 * p2;

        this.props[8] = i1 * a2 + j1 * e2 + k1 * i2 + l1 * m2;
        this.props[9] = i1 * b2 + j1 * f2 + k1 * j2 + l1 * n2;
        this.props[10] = i1 * c2 + j1 * g2 + k1 * k2 + l1 * o2;
        this.props[11] = i1 * d2 + j1 * h2 + k1 * l2 + l1 * p2;

        this.props[12] = m1 * a2 + n1 * e2 + o1 * i2 + p1 * m2;
        this.props[13] = m1 * b2 + n1 * f2 + o1 * j2 + p1 * n2;
        this.props[14] = m1 * c2 + n1 * g2 + o1 * k2 + p1 * o2;
        this.props[15] = m1 * d2 + n1 * h2 + o1 * l2 + p1 * p2;

        return this;
    }

    clone(matr: any) {
        var i;
        for (i = 0; i < 16; i += 1) {
            matr.props[i] = this.props[i];
        }
    }

    cloneFromProps(props: any) {
        var i;
        for (i = 0; i < 16; i += 1) {
            this.props[i] = props[i];
        }
    }

    applyToPoint(x: number, y: number, z: number) {

        return {
            x: x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
            y: x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
            z: x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]
        };
        /*return {
         x: x * me.a + y * me.c + me.e,
         y: x * me.b + y * me.d + me.f
         };*/
    }

    applyToX(x: number, y: number, z: number) {
        return x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12];
    }

    applyToY(x: number, y: number, z: number) {
        return x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13];
    }

    applyToZ(x: number, y: number, z: number) {
        return x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14];
    }

    applyToPointArray(x: number, y: number, z: number) {
        return [x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12], x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13], x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]];
    }

    applyToPointStringified(x: number, y: number) {
        return (Math.round(x * this.props[0] + y * this.props[4] + this.props[12])) + ',' + (Math.round(x * this.props[1] + y * this.props[5] + this.props[13]));
    }

}

export class TransformMatrix {

    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    readonly tx: number;
    readonly ty: number;

    constructor(a: number = 1.0, b: number = 0.0, c: number = 0.0, d: number = 1.0, tx: number = 0.0, ty: number = 0.0) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }

    static unmatrix(matrix: TransformMatrix): { scale: { x: number, y: number }, degree: number, translate: { x: number, y: number } } {
        var A = matrix.a
        var B = matrix.b
        var C = matrix.c
        var D = matrix.d
        if (A * D == B * C) {
            return { scale: { x: 1.0, y: 1.0 }, degree: 0.0, translate: { x: 0.0, y: 0.0 } }
        }
        // step (3)
        var scaleX = Math.sqrt(A * A + B * B)
        A /= scaleX
        B /= scaleX
        // step (4)
        var skew = A * C + B * D
        C -= A * skew
        D -= B * skew
        // step (5)
        var scaleY = Math.sqrt(C * C + D * D)
        C /= scaleY
        D /= scaleY
        skew /= scaleY
        // step (6)
        if (A * D < B * C) {
            A = -A
            B = -B
            skew = -skew
            scaleX = -scaleX
        }
        return { scale: { x: scaleX, y: scaleY }, degree: Math.atan2(B, A) / (Math.PI / 180), translate: { x: matrix.tx, y: matrix.ty } }
    }

    static isIdentity(matrix: TransformMatrix) {
        return matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1 && matrix.tx == 0 && matrix.ty == 0
    }

    static postScale(matrix: TransformMatrix, x?: number, y?: number): TransformMatrix {
        const obj = new TransformMatrixAlgorithm()
        const unMatrix = this.unmatrix(matrix)
        obj.rotate(-(unMatrix.degree * Math.PI / 180))
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0)
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0)
        obj.scale((x || 1.0), (y || 1.0), 1.0)
        return new TransformMatrix(obj.props[0], obj.props[1], obj.props[4], obj.props[5], obj.props[12], obj.props[13])
    }

    static postTranslate(matrix: TransformMatrix, x?: number, y?: number): TransformMatrix {
        const obj = new TransformMatrixAlgorithm()
        const unMatrix = this.unmatrix(matrix)
        obj.rotate(-(unMatrix.degree * Math.PI / 180))
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0)
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0)
        obj.translate((x || 0.0), (y || 0.0), 0.0)
        return new TransformMatrix(obj.props[0], obj.props[1], obj.props[4], obj.props[5], obj.props[12], obj.props[13])
    }

    static postRotate(matrix: TransformMatrix, angle: number): TransformMatrix {
        const obj = new TransformMatrixAlgorithm()
        const unMatrix = this.unmatrix(matrix)
        obj.rotate(-(unMatrix.degree * Math.PI / 180))
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0)
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0)
        obj.rotate(-angle)
        return new TransformMatrix(obj.props[0], obj.props[1], obj.props[4], obj.props[5], obj.props[12], obj.props[13])
    }

    static concat(preMatrix: TransformMatrix, postMatrix: TransformMatrix): TransformMatrix {
        const obj = new TransformMatrixAlgorithm()
        obj.props[0] = preMatrix.a
        obj.props[1] = preMatrix.b
        obj.props[4] = preMatrix.c
        obj.props[5] = preMatrix.d
        obj.props[12] = preMatrix.tx
        obj.props[13] = preMatrix.ty
        obj.transform(postMatrix.a, postMatrix.b, 0, 0, postMatrix.c, postMatrix.d, 0, 0, 0, 0, 1, 0, postMatrix.tx, postMatrix.ty, 0, 1)
        return new TransformMatrix(obj.props[0], obj.props[1], obj.props[4], obj.props[5], obj.props[12], obj.props[13])
    }


}