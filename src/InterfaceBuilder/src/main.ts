/// <reference path="../../xt.d.ts" />

import { Inspector } from './inspector'
import { DesignView } from './design'
import { Inspectable, InspectorBaseProperty, InspectorStringProperty, InspectorNumberProperty, InspectorBooleanProperty, InspectorEnumProperty, InspectorFourNumberProperty, InspectorHRProperty, BaseLayer } from './entities'
import { LayerView, LayerDelegate } from './layer'
import { ViewLayer } from './components/ViewLayer'
import { registerComponents } from './components/registerComponents';

registerComponents()

class MockItem implements Inspectable {

    name: string = "View"
    props: InspectorBaseProperty[]

    constructor() {
        const fooProp = new InspectorStringProperty()
        fooProp.name = "Foo"
        fooProp.placeholder = "Input Foo Value Here"
        fooProp.valueChanged = (value) => {
            document.title = value
        }
        const barProp = new InspectorNumberProperty()
        barProp.name = "Bar"
        barProp.placeholder = "Input Bar Value Here"
        barProp.valueChanged = (value) => {
            document.title = value.toString()
        }
        const boolProp = new InspectorBooleanProperty()
        boolProp.name = "User Interaction Enabled"
        boolProp.valueChanged = (value) => {
            document.title = value.toString()
        }
        const enumProp = new InspectorEnumProperty()
        enumProp.name = "Content Mode"
        enumProp.defaultValue = 1
        enumProp.enumOptions = {
            0: "Scale To Fill",
            1: "Aspect Fit",
            2: "Aspect Fill",
        }
        enumProp.valueChanged = (value) => {
            document.title = value.toString()
        }
        const insetsProp = new InspectorFourNumberProperty()
        insetsProp.name = "Content Insets"
        insetsProp.fourNames = ["Left", "Top", "Bottom", "Right"]
        insetsProp.fourDefaultValue = [1, 2, 3, 4]
        insetsProp.valueChanged = (value) => {
            console.log(value)
        }
        this.props = [fooProp, new InspectorHRProperty(), barProp, boolProp, enumProp, insetsProp]
    }

}

class XTIBAppDelegate extends UI.ApplicationDelegate implements LayerDelegate {


    inspectorView = new Inspector()
    designView = new DesignView()
    layerView = new LayerView()

    applicationDidFinishLaunchingWithOptions() {
        this.window = new UI.Window()
        this.setupWindow()
        this.window.makeKeyAndVisible()
        this.mock()
    }

    setupWindow() {
        if (this.window) {
            this.window.backgroundColor = UI.Color.yellowColor
            this.window.addSubview(this.designView)
            this.window.addSubview(this.inspectorView)
            this.layerView.delegate = this
            this.window.addSubview(this.layerView)
            this.window.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("H:|-0-[layerView(300)]-0-[designView]-0-[inspectorView(300)]-0-|", { designView: this.designView, inspectorView: this.inspectorView, layerView: this.layerView }))
            this.window.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[inspectorView]-0-|", { inspectorView: this.inspectorView }))
            this.window.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[layerView]-0-|", { layerView: this.layerView }))
            this.window.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[designView]-0-|", { designView: this.designView }))
            this.window.layoutIfNeeded()
        }
    }

    private mockLayer = new ViewLayer()

    mock() {
        this.mockLayer.name = "Root View"
        this.mockLayer.layerDidChange = (newLayer) => {
            this.mockLayer = newLayer
            this.reloadData()
            this.inspectorView.item = newLayer.props
            this.layerView.selectLayer(newLayer)
        }
        this.mockLayer.propsDidChange = () => {
            this.reloadData()
        }
        this.reloadData()
    }

    reloadData() {
        this.layerView.setLayerData(this.mockLayer)
        this.designView.setLayerData(this.mockLayer)
    }

    layerViewDidSelectLayer(layer: BaseLayer | undefined) {
        if (layer) {
            this.inspectorView.item = layer.props
            this.designView.currentLayer = layer
        }
    }

    layerViewRequireAddLayer(onLayer: BaseLayer) {
        const newChild = new ViewLayer()
        newChild.name = "New View"
        newChild.frame = UI.RectMake(0, 0, 44, 44)
        newChild.layerDidChange = (newLayer, oldLayer) => {
            const idx = onLayer.children.indexOf(oldLayer)
            if (idx >= 0) {
                onLayer.children[idx] = newLayer
                this.reloadData()
                this.inspectorView.item = newLayer.props
                this.layerView.selectLayer(newLayer)
            }
        }
        newChild.propsDidChange = () => {
            this.reloadData()
        }
        onLayer.children.push(newChild)
        this.reloadData()
        this.layerView.selectLayer(newChild)
    }

    layerViewRequireRemoveLayer(removeLayer: BaseLayer) {
        const removeLayerFunc = (obj: BaseLayer) => {
            obj.children = obj.children.filter(it => it !== removeLayer)
            obj.children.forEach(it => {
                removeLayerFunc(it)
            })
        }
        removeLayerFunc(this.mockLayer)
        this.layerView.setLayerData(this.mockLayer)
        this.designView.setLayerData(this.mockLayer)
    }

}

const xtibApplication = new UI.Application("app", new XTIBAppDelegate())