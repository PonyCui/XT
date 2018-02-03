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
        let output: any = {}
        for (const key in object) {
            const element = object[key];
            if (typeof element === "string" || typeof element === "number" || typeof element === "boolean" || element === null) {
                output[key] = element
            }
            else if (element instanceof Array) {
                output[key] = element.map(it => this.objectify(it))
            }
            else if (element instanceof Object && typeof element !== "function" && element !== null) {
                if (typeof element.toObject === "function") {
                    output[key] = this.objectifyRecursive(element.toObject())
                }
                else {
                    output[key] = this.objectify(element)
                }
            }
        }
        return output
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