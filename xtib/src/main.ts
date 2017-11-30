/// <reference path="../../src/xt.d.ts" />

import { Inspector } from './inspector'
import { Editor } from './editor';
import { Inspectable, InspectorBaseProperty, InspectorStringProperty, InspectorNumberProperty } from './entities';

class MockItem implements Inspectable {

    name: string = "View";
    props: InspectorBaseProperty[];

    constructor() {
        const fooProp = new InspectorStringProperty();
        fooProp.name = "Foo";
        fooProp.placeholder = "Input Foo Value Here";
        const barProp = new InspectorNumberProperty();
        barProp.name = "Bar";
        barProp.placeholder = "Input Bar Value Here";
        this.props = [fooProp, barProp];
    }
    
}

class XTIBAppDelegate extends XT.ApplicationDelegate {

    inspectorView = new Inspector();
    editorView = new Editor();

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
            this.window.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("H:|-0-[editorView]-0-[inspectorView(300)]-0-|", { editorView: this.editorView, inspectorView: this.inspectorView }));
            this.window.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[inspectorView]-0-|", { inspectorView: this.inspectorView }));
            this.window.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[editorView]-0-|", { editorView: this.editorView }));
            this.window.layoutIfNeeded();
        }
    }

    mock() {
        this.inspectorView.item = new MockItem();
    }

}

const xtibApplication = new XT.Application("app", new XTIBAppDelegate());

console.log("Hello, World!");