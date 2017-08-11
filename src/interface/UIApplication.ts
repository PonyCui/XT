import { UIWindow } from './UIWindow'

export class UIApplicationDelegate {
    window?: UIWindow;
    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: Object): void { }
}

export class UIApplication {
    delegate: UIApplicationDelegate
    keyWindow?: UIWindow
    sharedApplication?(): UIApplication { throw "NOT IMPLEMENT!" }
}