/// <reference path="../xtf.d.ts" />
/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

import { URLSessionTask as IURLSessionTask } from '../interface/URLSessionTask'

export class URLSessionTask extends IURLSessionTask {

    readonly objectRef: any

    constructor(objectRef: string) {
        super()
        this.objectRef = objectRef
    }

    retain(owner: any = undefined): this {
        _XTRetain(this.objectRef, owner)
        return this
    }
    
    release(): this {
        _XTRelease(this.objectRef)
        return this
    }

    cancel(): void {
        _XTFURLSessionTask.cancel(this.objectRef)
    }

    resume(): void {
        _XTFURLSessionTask.resume(this.objectRef)
    }

}
