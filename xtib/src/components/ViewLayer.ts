import { BaseLayer, InspectorStringProperty, InspectorNumberProperty, InspectorHRProperty, InspectorBooleanProperty, Inspectable, InspectorFourNumberProperty, InspectorEnumProperty } from "../entities";

export class ViewLayer extends BaseLayer {

    tag: number = 0
    interactionEnabled: boolean = false
    alpha: number = 1.0
    hidden: boolean = false
    cornerRadius: number = 0
    clipsToBounds: boolean = false
    backgroundColor: XT.Color = XT.Color.whiteColor
    frame?: XT.Rect = undefined

    static componentCloner: { [key: number]: (originLayer: ViewLayer) => ViewLayer } = {}
    static componentMap: { [key: number]: string } = {}
    static componentID = 0
    static componentName = "XT.View"

    protected findProps(): any {
        const classProp = new InspectorEnumProperty()
        classProp.name = "Class"
        classProp.enumOptions = ViewLayer.componentMap
        classProp.defaultValue = ViewLayer.componentID
        classProp.valueChanged = (value) => {
            let newLayer: ViewLayer | undefined = undefined
            if (ViewLayer.componentCloner[value]) {
                newLayer = ViewLayer.componentCloner[value](this)
            }
            if (this.layerDidChange && newLayer) {
                this.layerDidChange(newLayer, this)
            }
        }
        const nameProp = new InspectorStringProperty()
        nameProp.name = "Name"
        nameProp.defaultValue = this.name || "View"
        nameProp.valueChanged = (value) => {
            this.name = value;
            this.propsDidChange && this.propsDidChange();
        }
        const tagProp = new InspectorNumberProperty()
        tagProp.name = "Tag"
        tagProp.defaultValue = this.tag
        tagProp.valueChanged = (value) => {
            this.tag = value;
        }
        const interactionEnabledProp = new InspectorBooleanProperty()
        interactionEnabledProp.name = "User Interaction Enabled"
        interactionEnabledProp.defaultValue = this.interactionEnabled
        interactionEnabledProp.valueChanged = (value) => {
            this.interactionEnabled = value;
        }
        const alphaProp = new InspectorNumberProperty()
        alphaProp.name = "Alpha"
        alphaProp.defaultValue = this.alpha
        alphaProp.minValue = 0
        alphaProp.maxValue = 1
        alphaProp.valueChanged = (value) => {
            this.alpha = value;
            this.propsDidChange && this.propsDidChange();
        }
        const backgroundColorProp = new InspectorStringProperty()
        backgroundColorProp.name = "Background"
        backgroundColorProp.placeholder = "#RRGGBB / #AARRGGBB"
        if (this.backgroundColor.a !== 1.0) {
            backgroundColorProp.defaultValue = ("#" + ('0' + Math.floor(this.backgroundColor.a * 255).toString(16)).slice(-2) + ('0' + Math.floor(this.backgroundColor.r * 255).toString(16)).slice(-2) + ('0' + Math.floor(this.backgroundColor.g * 255).toString(16)).slice(-2) + ('0' + Math.floor(this.backgroundColor.b * 255).toString(16)).slice(-2)).toUpperCase()
        }
        else {
            backgroundColorProp.defaultValue = ("#" + ('0' + Math.floor(this.backgroundColor.r * 255).toString(16)).slice(-2) + ('0' + Math.floor(this.backgroundColor.g * 255).toString(16)).slice(-2) + ('0' + Math.floor(this.backgroundColor.b * 255).toString(16)).slice(-2)).toUpperCase()
        }
        backgroundColorProp.valueChanged = (value) => {
            if (value.startsWith("#")) {
                if (value.length == 7) {
                    try {
                        const r = parseInt("0x" + value.substring(1, 3)) / 255.0
                        const g = parseInt("0x" + value.substring(3, 5)) / 255.0
                        const b = parseInt("0x" + value.substring(5, 7)) / 255.0
                        this.backgroundColor = new XT.Color(r, g, b, 1.0)
                        this.propsDidChange && this.propsDidChange();
                    } catch (error) { }
                }
                if (value.length == 9) {
                    try {
                        const a = parseInt("0x" + value.substring(1, 3)) / 255.0
                        const r = parseInt("0x" + value.substring(3, 5)) / 255.0
                        const g = parseInt("0x" + value.substring(5, 7)) / 255.0
                        const b = parseInt("0x" + value.substring(7, 9)) / 255.0
                        this.backgroundColor = new XT.Color(r, g, b, a)
                        this.propsDidChange && this.propsDidChange();
                    } catch (error) { }
                }
            }
        }
        const hiddenProp = new InspectorBooleanProperty()
        hiddenProp.name = "Hidden"
        hiddenProp.defaultValue = this.hidden
        hiddenProp.valueChanged = (value) => {
            this.hidden = value;
            this.propsDidChange && this.propsDidChange();
        }
        const cornerRadiusProp = new InspectorNumberProperty()
        cornerRadiusProp.name = "Corner Radius"
        cornerRadiusProp.defaultValue = this.cornerRadius
        cornerRadiusProp.valueChanged = (value) => {
            this.cornerRadius = value;
            this.propsDidChange && this.propsDidChange();
        }
        const clipsProp = new InspectorBooleanProperty()
        clipsProp.name = "Clips to Bounds"
        clipsProp.defaultValue = false
        clipsProp.valueChanged = (value) => {
            this.clipsToBounds = value;
            this.propsDidChange && this.propsDidChange();
        }
        const frameProp = new InspectorFourNumberProperty();
        frameProp.name = "Frame"
        frameProp.fourNames = ["x", "y", "width", "height"]
        if (this.frame) {
            frameProp.fourDefaultValue = [this.frame.x, this.frame.y, this.frame.width, this.frame.height]
        }
        else {
            frameProp.fourDefaultValue = [];
        }
        frameProp.valueChanged = (value) => {
            this.frame = XT.RectMake(value[0] || 0, value[1] || 0, value[2] || 0, value[3] || 0)
            this.propsDidChange && this.propsDidChange();
        }
        return {
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
        }
    }

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
        return {
            name: "View",
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

    layerDidChange?: (newLayer: ViewLayer, oldLayer: ViewLayer) => void

    requestDesignView(): XT.View | undefined {
        const view = new XT.View()
        view.backgroundColor = this.backgroundColor
        view.alpha = this.alpha
        view.hidden = this.hidden
        view.cornerRadius = this.cornerRadius
        view.clipsToBounds = this.clipsToBounds
        if (this.frame) {
            view.frame = this.frame
        }
        return view
    }

}

ViewLayer.componentCloner[ViewLayer.componentID] = (originLayer) => {
    const newLayer = new ViewLayer()
    Object.keys(originLayer).forEach(it => {
        newLayer[it] = originLayer[it];
    })
    return newLayer
}
ViewLayer.componentMap[ViewLayer.componentID] = ViewLayer.componentName