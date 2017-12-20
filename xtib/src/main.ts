/// <reference path="../../src/xt.d.ts" />

import { Inspector } from './inspector'
import { Editor } from './editor';
import { Inspectable, InspectorBaseProperty, InspectorStringProperty, InspectorNumberProperty, InspectorBooleanProperty, InspectorEnumProperty, InspectorFourNumberProperty, InspectorHRProperty, BaseLayer } from './entities';
import { LayerView } from './layer';

class MockItem implements Inspectable {

    name: string = "View";
    props: InspectorBaseProperty[];

    constructor() {
        const fooProp = new InspectorStringProperty();
        fooProp.name = "Foo";
        fooProp.placeholder = "Input Foo Value Here";
        fooProp.valueChanged = (value) => {
            document.title = value
        }
        const barProp = new InspectorNumberProperty();
        barProp.name = "Bar";
        barProp.placeholder = "Input Bar Value Here";
        barProp.valueChanged = (value) => {
            document.title = value.toString()
        }
        const boolProp = new InspectorBooleanProperty();
        boolProp.name = "User Interaction Enabled";
        boolProp.valueChanged = (value) => {
            document.title = value.toString()
        }
        const enumProp = new InspectorEnumProperty();
        enumProp.name = "Content Mode";
        enumProp.defaultValue = 1;
        enumProp.enumOptions = {
            0: "Scale To Fill",
            1: "Aspect Fit",
            2: "Aspect Fill",
        }
        enumProp.valueChanged = (value) => {
            document.title = value.toString()
        }
        const insetsProp = new InspectorFourNumberProperty();
        insetsProp.name = "Content Insets"
        insetsProp.fourNames = ["Left", "Top", "Bottom", "Right"];
        insetsProp.fourDefaultValue = [1, 2, 3, 4];
        insetsProp.valueChanged = (value) => {
            console.log(value)
        }
        this.props = [fooProp, new InspectorHRProperty(), barProp, boolProp, enumProp, insetsProp];
    }

}

class MockLayer extends BaseLayer {

    constructor() {
        super()
        this.name = "Root View"
        const child0 = new BaseLayer();
        child0.name = "Child 0 View"
        const child1 = new BaseLayer();
        child1.name = "Child 1 View"
        const child2 = new BaseLayer();
        child2.name = "Child 2 View"
        this.children = [
            child0,
            child1,
            child2,
        ]
    }

}

class XTIBAppDelegate extends XT.ApplicationDelegate {

    inspectorView = new Inspector();
    editorView = new Editor();
    layerView = new LayerView();

    applicationDidFinishLaunchingWithOptions() {
        this.window = new XT.Window();
        this.setupWindow();
        this.window.makeKeyAndVisible();
        this.mock();
    }

    setupWindow() {
        if (this.window) {
            this.window.backgroundColor = XT.Color.yellowColor;
            this.window.addSubview(this.editorView);
            this.window.addSubview(this.inspectorView);
            this.window.addSubview(this.layerView);
            this.window.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("H:|-0-[editorView]-0-[inspectorView(300)]-0-|", { editorView: this.editorView, inspectorView: this.inspectorView }));
            this.window.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("H:[layerView(300)]-0-|", { layerView: this.layerView }));
            this.window.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[inspectorView]-[layerView(400)]-0-|", { inspectorView: this.inspectorView, layerView: this.layerView }));
            this.window.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[editorView]-0-|", { editorView: this.editorView }));
            this.window.layoutIfNeeded();
        }
    }

    mock() {
        this.inspectorView.item = new MockItem();
        this.layerView.setLayerData(new MockLayer());
    }

}

const xtibApplication = new XT.Application("app", new XTIBAppDelegate());