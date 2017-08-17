import { Window } from './Window'

export class ApplicationDelegate {
    window?: Window;
    applicationDidFinishLaunchingWithOptions(application: Application, launchOptions: Object): void { }
}

export class Application {
    delegate: ApplicationDelegate
    keyWindow?: Window
    sharedApplication?(): Application { throw "NOT IMPLEMENT!" }
}