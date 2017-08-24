/// <reference path="xtr.d.ts" />
import { ApplicationDelegate } from "../../interface/Application";
// import { Window } from './Window'

let sharedApplication: Application | undefined = undefined;

export class Application {

    nativeObject: any;
    delegate: ApplicationDelegate
    // keyWindow?: Window

    constructor(t: any, delegate: ApplicationDelegate) {
        if (sharedApplication === undefined) {
            sharedApplication = this;
        }
        this.nativeObject = XTRApplication.create();
        XTRApplicationDelegate.attachDelegate(delegate);
        this.delegate = delegate;
    }

    static sharedApplication?(): Application | undefined {
        return sharedApplication
    }

}