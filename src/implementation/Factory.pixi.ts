import { usePixi } from './pixi/index'
import * as I from '../interface/Abstract'

export class Factory {

    static CGRectMake = I.CGRectMake;
    static CGRectZero = I.CGRectZero;
    static UIView: typeof I.UIView = I.UIView;
    static UIApplication: typeof I.UIApplication = I.UIApplication;
    static UIApplicationDelegate: typeof I.UIApplicationDelegate = I.UIApplicationDelegate;
    static UIWindow: typeof I.UIWindow = I.UIWindow;
    static UIColor = I.UIColor;
    static UIScreen = I.UIScreen;
    static CGTransformMatrix = I.CGTransformMatrix;
    static NSLayoutConstraint = I.NSLayoutConstraint;

}

export function SwitchFactory() {
    usePixi();
}