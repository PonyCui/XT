import { ViewLayer } from "./ViewLayer";
import { Inspectable, InspectorHRProperty } from "../entities";

export class ButtonLayer extends ViewLayer {

    static componentID = 1
    static componentName = "UI.Button"

    public get props(): Inspectable {
        const {
            classProp,
            nameProp,
            frameProp,
            tagProp,
            interactionEnabledProp,
            alphaProp,
            backgroundColorProp,
            hiddenProp,
            cornerRadiusProp,
            clipsProp,
        } = this.findProps()
        classProp.defaultValue = ButtonLayer.componentID
        return {
            name: "Button",
            props: [
                classProp,
                nameProp,
                frameProp,
                new InspectorHRProperty(),
                tagProp,
                interactionEnabledProp,
                new InspectorHRProperty(),
                alphaProp,
                backgroundColorProp,
                hiddenProp,
                cornerRadiusProp,
                clipsProp,
            ],
        }
    }

}

ViewLayer.componentCloner[ButtonLayer.componentID] = (originLayer: any) => {
    const newLayer: any = new ButtonLayer()
    Object.keys(originLayer).forEach(it => {
        newLayer[it] = originLayer[it];
    })
    return newLayer
}
ViewLayer.componentMap[ButtonLayer.componentID] = ButtonLayer.componentName