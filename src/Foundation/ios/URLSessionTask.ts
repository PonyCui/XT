/// <reference path="../xtf.d.ts" />
/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

import { URLSessionTask as IURLSessionTask } from '../interface/URLSessionTask'

export class URLSessionTask extends XT.BaseObject {

    constructor(objectRef: string) {
        super()
        this.objectRef = objectRef
    }

    cancel(): void {
        _XTFURLSessionTask.cancel(this.objectRef)
    }

    resume(): void {
        _XTFURLSessionTask.resume(this.objectRef)
    }

}
