import { CGRect, CGRectMake } from './CGRect'
import { UIColor } from './UIColor'
import { UIWindow } from './UIWindow'

export class UIView {

    tag: number;
    hidden: boolean;
    alpha: number;
    frame: CGRect;
    backgroundColor?: UIColor;
    cornerRadius: number;
    masksToBounds: boolean;

    constructor(rect: CGRect) { }

    // Mark: View Hierarchy
    
    superview?: UIView
    subviews: UIView[]
    window?: UIWindow

    removeFromSuperview() { }
    insertSubviewAtIndex(subview: UIView, atIndex: number) {}
    exchangeSubviewAtIndex(index1: number, index2: number) {}

    addSubview(subview: UIView) { }
    insertSubviewBelow(subview: UIView, siblingSubview: UIView) {}
    insertSubviewAbove(subview: UIView, siblingSubview: UIView) {}

    bringSubviewToFront(subview: UIView) {}
    sendSubviewToBack(subview: UIView) {}

    didAddSubview(subview: UIView) {}
    willRemoveSubview(subview: UIView) {}

    willMoveToSuperview(newSuperview?: UIView) {}
    didMoveToSuperview() {}
    willMoveToWindow(newWindow?: UIWindow) {}
    didMoveToWindow() {}

    isDescendantOfView(view: UIView) { return false }

    setNeedsLayout() {}
    layoutIfNeeded() {}
    layoutSubviews() {}
    
}