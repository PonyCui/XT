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