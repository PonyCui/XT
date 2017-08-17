export interface Point {
    readonly x: number;
    readonly y: number;
}

export function PointMake(x: number, y: number): Point {
    return { x, y };
}

export function PointEqual(point1: Point, point2: Point): boolean {
    return point1.x === point2.x && point1.y === point2.y;
}

export const PointZero = PointMake(0, 0)

export interface Size {
    readonly width: number;
    readonly height: number;
}

export function SizeMake(width: number, height: number): Size {
    return { width, height };
}

export function SizeEqual(size1: Size, size2: Size): boolean {
    return size1.width === size2.width && size1.height === size2.height;
}

export const SizeZero = SizeMake(0, 0)

export interface Rect {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}

export function RectMake(x: number, y: number, width: number, height: number): Rect {
    return { x, y, width, height };
}

export const RectZero = RectMake(0, 0, 0, 0)

export function RectEqual(rect1: Rect, rect2: Rect): boolean {
    return rect1.x === rect2.x && rect1.y === rect2.y && rect1.width === rect2.width && rect1.height === rect2.height;
}

export function RectInside(rect1: Rect, rect2: Rect): boolean {
    return rect2.x > rect1.x && rect2.x + rect2.width < rect1.x + rect1.width && rect2.y > rect1.y && rect2.y + rect2.height < rect1.y + rect1.height;
}