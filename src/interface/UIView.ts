import { CGRect, CGRectMake, CGPoint, CGPointMake } from './CGRect'
import { UIColor } from './UIColor'
import { UIWindow } from './UIWindow'

export class UIView {

    constructor(rect: CGRect) { }

    tag: number;
    userInteractionEnabled: boolean;

    // Mark: View Geometry
    frame: CGRect;
    bounds: CGRect;
    center: CGPoint;
    transform: any; //todo

    // Mark: View Rendering
    clipsToBounds: boolean;
    backgroundColor?: UIColor;
    alpha: number;
    opaque: boolean;
    hidden: boolean;
    contentMode?: any; // todo
    maskView?: UIView
    tintColor: UIColor
    tintColorDidChange() {}

    // Mark: View Layer-Back Rendering
    cornerRadius: number;
    borderWidth: number;
    borderColor?: UIColor;
    shadowColor?: UIColor;
    shadowOpacity: number;
    shadowOffset?: CGPoint;
    shadowRadius: number;
    
    // Mark: View Hierarchy
    superview?: UIView
    subviews: UIView[]
    window?: UIWindow

    removeFromSuperview() { }
    insertSubviewAtIndex(subview: UIView, atIndex: number) { }
    exchangeSubviewAtIndex(index1: number, index2: number) { }

    addSubview(subview: UIView) { }
    insertSubviewBelow(subview: UIView, siblingSubview: UIView) { }
    insertSubviewAbove(subview: UIView, siblingSubview: UIView) { }

    bringSubviewToFront(subview: UIView) { }
    sendSubviewToBack(subview: UIView) { }

    didAddSubview(subview: UIView) { }
    willRemoveSubview(subview: UIView) { }

    willMoveToSuperview(newSuperview?: UIView) { }
    didMoveToSuperview() { }
    willMoveToWindow(newWindow?: UIWindow) { }
    didMoveToWindow() { }

    isDescendantOfView(view: UIView) { return false }

    setNeedsLayout() { }
    layoutIfNeeded() { }
    layoutSubviews() { }

}