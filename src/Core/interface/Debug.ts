export class Debug {

    static run(id: string, t: any, s: any) { }

    static stringify(object: any): string {
        return JSON.stringify(this.objectify(object))
    }

    static objectify(object: any): any {
        if (typeof object === "string" || typeof object === "number" || typeof object === "boolean" || object === null) {
            return object
        }
        else if (object instanceof Array) {
            return object.map(it => this.objectify(it))
        }
        else if (object instanceof Object && typeof object !== "function" && object !== null) {
            if (typeof object.toObject === "function") {
                return this.objectifyRecursive(object.toObject())
            }
        }
        return this.objectifyRecursive({ ...object })
    }

    static objectifyRecursive(object: any): any {
        if (object instanceof Object) {
            for (const key in object) {
                const element = object[key];
                if (element instanceof Object && typeof element !== "function" && element !== null) {
                    if (typeof element.toObject === "function") {
                        object[key] = this.objectifyRecursive(element.toObject())
                    }
                }
            }
        }
        return object
    }

}