import { BaseObject } from "./BaseObject"

export class BaseArray<T> extends BaseObject {

    constructor(items: T[] = []) { super() }
    length: number
    toString(): string { throw Error("Not Implement!") }
    toLocaleString(): string { throw Error("Not Implement!") }
    push(...items: T[]): number { throw Error("Not Implement!") }
    pop(): T | undefined { throw Error("Not Implement!") }
    concat(...items: (T | T[] | ReadonlyArray<T>)[]): T[] { throw Error("Not Implement!") }
    join(separator?: string): string { throw Error("Not Implement!") }
    reverse(): T[] { throw Error("Not Implement!") }
    shift(): T | undefined { throw Error("Not Implement!") }
    slice(start?: number, end?: number): T[] { throw Error("Not Implement!") }
    sort(compareFn?: (a: T, b: T) => number): this { throw Error("Not Implement!") }
    splice(start: number, deleteCount: number, ...items: T[]): T[] { throw Error("Not Implement!") }
    unshift(...items: T[]): number { throw Error("Not Implement!") }
    indexOf(searchElement: T, fromIndex?: number): number { throw Error("Not Implement!") }
    lastIndexOf(searchElement: T, fromIndex?: number): number { throw Error("Not Implement!") }
    every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean { throw Error("Not Implement!") }
    some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean { throw Error("Not Implement!") }
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void { throw Error("Not Implement!") }
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] { throw Error("Not Implement!") }
    filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[] { throw Error("Not Implement!") }
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T { throw Error("Not Implement!") }
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T { throw Error("Not Implement!") }
    clear() { throw Error("Not Implement!") }
    [n: number]: T

}