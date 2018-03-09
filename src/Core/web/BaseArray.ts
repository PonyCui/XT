export class BaseArray<T> extends Array<T> {

    constructor(items: T[] = []) {
        super()
        items.forEach(item => {
            this.push(item)
        });
    }

}

(Array.prototype as any).clear = function() {
    this.splice(0, this.length)
}