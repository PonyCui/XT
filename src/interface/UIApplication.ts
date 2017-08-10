import { UIWindow } from './UIWindow'

export interface UIApplicationDelegate {
    window?: UIWindow;
    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: Object): void
}

export interface UIApplication {
    delegate: UIApplicationDelegate
}