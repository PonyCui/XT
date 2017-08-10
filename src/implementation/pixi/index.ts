import { Factory } from '../Factory'
import { UIView } from './UIView'
import { UIApplication } from './UIApplication'

export function usePixi(force = false) {
    const use = () => {
        Factory.UIView = UIView
        Factory.UIApplication = UIApplication
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