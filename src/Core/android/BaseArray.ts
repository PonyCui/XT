import { BaseObject } from "./BaseObject"

export class BaseArray<T> extends BaseObject {

    private backArray: Array<T> = []

    constructor(items: T[] = []) {
        super()
        items.forEach(item => {
            this.push(item)
        })
    }

    public get length(): number {
        return this.backArray.length
    }

    dealloc() {
        if (this.isDealloced) { return }
        this.isDealloced = true
        this.backArray.forEach(item => {
            if (item instanceof BaseObject) {
                item.release()
            }
        })
    }

    toString(): string { return this.backArray.toString() }

    toLocaleString(): string { return this.backArray.toLocaleString() }

    push(...items: T[]): number {
        items.forEach(item => {
            if (item instanceof BaseObject) {
                item.retain()
            }
        })
        return this.backArray.push.apply(this.backArray, items)
    }

    pop(): T | undefined {
        const value: T | undefined = this.backArray.pop()
        if (value instanceof BaseObject) {
            value.release()
        }
        return value
    }

    concat(items: (T | T[] | ReadonlyArray<T>)[]): BaseArray<T> {
        items.forEach((arrItems) => {
            if (arrItems instanceof Array) {
                arrItems.forEach(item => {
                    if (item instanceof BaseObject) {
                        item.retain()
                    }
                })
            }
        })
        return new BaseArray(this.backArray.concat.apply(this.backArray, items instanceof BaseArray ? items.backArray : items))
    }

    join(separator?: string): string { return this.backArray.join(separator) }

    reverse(): BaseArray<T> {
        this.backArray.reverse()
        return this
    }

    shift(): T | undefined {
        const value = this.backArray.shift()
        if (value instanceof BaseObject) {
            value.release()
        }
        return value
    }

    slice(start?: number, end?: number): BaseArray<T> {
        return new BaseArray(this.backArray.slice())
    }

    sort(compareFn?: (a: T, b: T) => number): this { this.backArray.sort(compareFn); return this }

    splice(start: number, deleteCount: number, ...items: T[]): T[] {
        const args: any[] = ([start, deleteCount] as any[]).concat(items)
        const values = this.backArray.splice.apply(this.backArray, args)
        values.forEach((value: any) => {
            if (value instanceof BaseObject) {
                value.release()
            }
        })
        items.forEach((item) => {
            if (item instanceof BaseObject) {
                item.retain()
            }
        })
        return values
    }

    unshift(...items: T[]): number {
        items.forEach(item => {
            if (item instanceof BaseObject) {
                item.retain()
            }
        })
        return this.backArray.unshift.apply(this.backArray, items)
    }

    indexOf(searchElement: T, fromIndex?: number): number { return this.backArray.indexOf(searchElement, fromIndex) }

    lastIndexOf(searchElement: T, fromIndex?: number): number { return this.backArray.lastIndexOf(searchElement, fromIndex) }

    every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean { return this.backArray.every(callbackfn) }

    some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean { return this.backArray.some(callbackfn) }

    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void { return this.backArray.forEach(callbackfn) }

    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): BaseArray<U> {
        return new BaseArray<U>(this.backArray.map(callbackfn))
    }

    filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): BaseArray<T> {
        return new BaseArray(this.backArray.filter(callbackfn))
    }

    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T { return this.backArray.reduce(callbackfn) }

    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T { return this.backArray.reduceRight(callbackfn) }

    clear() {
        this.backArray.forEach((element) => {
            if (element instanceof BaseObject) {
                element.release()
            }
        })
        this.backArray = []
    }

    [n: number]: T

}