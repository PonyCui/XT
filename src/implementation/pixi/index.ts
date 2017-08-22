import { Factory } from '../Factory.pixi'
import { View } from './View'
import { Application } from './Application'
import { Window } from './Window'
import { LayoutConstraint } from "./LayoutConstraint";
import { Label } from "./Label";
import { Button } from "./Button";
import { ImageView, Image } from "./ImageView";
import { ScrollView } from "./ScrollView";

export function usePixi(force = false) {
    const use = () => {
        Factory.View = View as any
        Factory.Application = Application as any
        Factory.Window = Window as any
        Factory.LayoutConstraint = LayoutConstraint as any
        Factory.Label = Label as any
        Factory.Button = Button as any
        Factory.ImageView = ImageView as any
        Factory.Image = Image as any
        Factory.ScrollView = ScrollView as any
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