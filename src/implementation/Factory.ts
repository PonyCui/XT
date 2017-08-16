import * as I from '../interface/Abstract'

export class Factory {

    static CGPointMake = I.CGPointMake
    static CGPointEqual = I.CGPointEqual
    static CGPointZero = I.CGPointZero
    static CGRectMake = I.CGRectMake;
    static CGRectZero = I.CGRectZero;
    static CGRectEqual = I.CGRectEqual;
    static CGRectInside = I.CGRectInside;
    static CGSizeMake = I.CGSizeMake;
    static CGSizeZero = I.CGSizeZero;
    static CGSizeEqual = I.CGSizeEqual;
    static UILabel = I.UILabel;
    static UITextAlignment = I.UITextAlignment;
    static UIFont = I.UIFont;
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
    
}