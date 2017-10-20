import { TransformMatrix } from "../../../interface/TransformMatrix";

export interface CoordinateOwner {

    transformMatrix?: { a: number, b: number, c: number, d: number, tx: number, ty: number }
    frame: { x: number, y: number, width: number, height: number }
    superview: CoordinateOwner | undefined
    subviews: CoordinateOwner[]

}

export function isPointInside(point: { x: number, y: number }, owner: CoordinateOwner) {
    return point.x >= 0.0 && point.x <= owner.frame.width && point.y >= 0.0 && point.y <= owner.frame.height
}

export function convertPointToChildView(point: { x: number, y: number }, parent: CoordinateOwner, child: CoordinateOwner): { x: number, y: number } {
    let stack = [child];
    let current = child;
    while (current.superview) {
        stack.unshift(current.superview);
        current = current.superview
    }
    if (stack.indexOf(parent) < 0) {
        return point
    }
    else {
        let curPoint = { ...point }
        stack.forEach(nextView => {
            if (nextView.transformMatrix) {
                let unmatrix = TransformMatrix.unmatrix(nextView.transformMatrix)
                let newMatrix = TransformMatrix.postTranslate(new TransformMatrix(), -nextView.frame.width / 2.0, -nextView.frame.height / 2.0)
                newMatrix = TransformMatrix.postRotate(newMatrix, unmatrix.degree * Math.PI / 180.0);
                newMatrix = TransformMatrix.postScale(newMatrix, unmatrix.scale.x, unmatrix.scale.y)
                newMatrix = TransformMatrix.postTranslate(newMatrix, unmatrix.translate.x, unmatrix.translate.y)
                newMatrix = TransformMatrix.postTranslate(newMatrix, nextView.frame.width / 2.0, nextView.frame.height / 2.0)
                let m = point.x - nextView.frame.x - newMatrix.tx;
                let n = point.y - nextView.frame.y - newMatrix.ty;
                let x = (n - m * newMatrix.c / newMatrix.d) / (newMatrix.a - newMatrix.b * newMatrix.c / newMatrix.a)
                let y = -(n - m * newMatrix.a / newMatrix.b) / (newMatrix.c - newMatrix.a * newMatrix.d / newMatrix.b)
                curPoint = { x: x, y: y }
            }
            else {
                curPoint = { x: curPoint.x - nextView.frame.x, y: curPoint.y - nextView.frame.y }
            }
        })
        return curPoint
    }
}