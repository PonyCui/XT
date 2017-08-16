import { Factory } from '../Factory.pixi'
import { UIView } from './UIView'
import { UIApplication } from './UIApplication'
import { UIWindow } from './UIWindow'
import { NSLayoutConstraint } from "./NSLayoutConstraint";
import { UILabel } from "./UILabel";

export function usePixi(force = false) {
    const use = () => {
        Factory.UIView = UIView
        Factory.UIApplication = UIApplication as any
        Factory.UIWindow = UIWindow
        Factory.NSLayoutConstraint = NSLayoutConstraint
        Factory.UILabel = UILabel
    }
    if (force) {
        use()
    }
    else if (window !== undefined) {
        const $window = (window as any)
        if ($window.PIXI !== undefined) {
            use()
        }
    }
}