import { Releasable } from "./Releasable";

/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */
export class URLSessionTask implements Releasable {

    retain(): this {
        throw new Error("Method not implemented.");
    }
    
    release(): this {
        throw new Error("Method not implemented.");
    }

    cancel(): void { }
    resume(): void { }

}
