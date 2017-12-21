/// <reference path="../../src/xt.d.ts" />

import { Inspector } from './inspector'
import { DesignView } from './design'
import { Inspectable, InspectorBaseProperty, InspectorStringProperty, InspectorNumberProperty, InspectorBooleanProperty, InspectorEnumProperty, InspectorFourNumberProperty, InspectorHRProperty, BaseLayer } from './entities'
import { LayerView, LayerDelegate } from './layer'
import { ViewLayer } from './components/ViewLayer';

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

class MockLayer extends ViewLayer {

    constructor() {
        super()
        this.name = "Root View"
        const child0 = new ViewLayer()
        child0.propsDidChange = () => {
            this.propsDidChange && this.propsDidChange();
        }
        child0.name = "Child 0 View"
        const child1 = new ViewLayer()
        child1.name = "Child 1 View"
        child1.propsDidChange = () => {
            this.propsDidChange && this.propsDidChange();
        }
        const child2 = new ViewLayer()
        child2.name = "Child 2 View"
        child2.propsDidChange = () => {
            this.propsDidChange && this.propsDidChange();
        }
        this.children = [
            child0,
            child1,
            child2,
        ]
    }

}

class XTIBAppDelegate extends XT.ApplicationDelegate implements LayerDelegate {


    inspectorView = new Inspector()
    designView = new DesignView()
    layerView = new LayerView()

    applicationDidFinishLaunchingWithOptions() {
        this.window = new XT.Window()
        this.setupWindow()
        this.window.makeKeyAndVisible()
        this.mock()
    }

    setupWindow() {
        if (this.window) {
            this.window.backgroundColor = XT.Color.yellowColor
            this.window.addSubview(this.designView)
            this.window.addSubview(this.inspectorView)
            this.layerView.delegate = this
            this.window.addSubview(this.layerView)
            this.window.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("H:|-0-[layerView(300)]-0-[designView]-0-[inspectorView(300)]-0-|", { designView: this.designView, inspectorView: this.inspectorView, layerView: this.layerView }))
            this.window.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[inspectorView]-0-|", { inspectorView: this.inspectorView }))
            this.window.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[layerView]-0-|", { layerView: this.layerView }))
            this.window.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[designView]-0-|", { designView: this.designView }))
            this.window.layoutIfNeeded()
        }
    }

    private mockLayer = new MockLayer()

    mock() {
        this.mockLayer.propsDidChange = () => {
            this.layerView.setLayerData(this.mockLayer)
            this.designView.setLayerData(this.mockLayer)
        }
        this.layerView.setLayerData(this.mockLayer)
        this.designView.setLayerData(this.mockLayer)
    }

    layerViewDidSelectLayer(layer: BaseLayer | undefined) {
        if (layer) {
            this.inspectorView.item = layer.props
        }
    }

    layerViewRequireAddLayer(onLayer: BaseLayer) {
        const newChild = new ViewLayer()
        newChild.name = "New View"
        newChild.propsDidChange = () => {
            this.layerView.setLayerData(this.mockLayer)
            this.designView.setLayerData(this.mockLayer)
        }
        onLayer.children.push(newChild)
        this.layerView.setLayerData(this.mockLayer)
        this.designView.setLayerData(this.mockLayer)
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

const xtibApplication = new XT.Application("app", new XTIBAppDelegate())