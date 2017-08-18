import { Factory } from '../Factory.pixi'
import { View } from './View'
import { Application } from './Application'
import { Window } from './Window'
import { LayoutConstraint } from "./LayoutConstraint";
import { Label } from "./Label";
import { Button } from "./Button";

export function usePixi(force = false) {
    const use = () => {
        Factory.View = View
        Factory.Application = Application as any
        Factory.Window = Window
        Factory.LayoutConstraint = LayoutConstraint
        Factory.Label = Label
        Factory.Button = Button
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