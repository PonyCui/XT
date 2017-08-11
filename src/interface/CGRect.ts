export interface CGPoint {
    readonly x: number;
    readonly y: number;
}

export function CGPointMake(x: number, y: number): CGPoint {
    return {x, y};
}

export const CGPointZero = CGPointMake(0, 0)

export interface CGSize {
    readonly width: number;
    readonly height: number;
}

export function CGSizeMake(width: number, height: number): CGSize {
    return {width, height};
}

export const CGSizeZero = CGSizeMake(0, 0)

export interface CGRect {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}

export function CGRectMake(x: number, y: number, width: number, height: number): CGRect {
    return {x, y, width, height};
}

export const CGRectZero = CGRectMake(0, 0, 0, 0)

export function CGRectEqual(rect1: CGRect, rect2: CGRect): boolean {
    return rect1.x === rect2.x && rect1.y === rect2.y && rect1.width === rect2.width && rect1.height === rect2.height;
}