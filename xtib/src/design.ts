/// <reference path="../../src/xt.d.ts" />
import { BaseLayer } from "./entities"
import { ViewLayer } from "./components/ViewLayer";


export class DesignView extends XT.View {

    private layerData: BaseLayer | undefined = undefined
    public canvasSize = XT.SizeMake(375, 667)

    init() {
        super.init()
        this.backgroundColor = new XT.Color(0x17 / 0xff, 0x17 / 0xff, 0x17 / 0xff, 0xff)
    }

    public setLayerData(layerData: BaseLayer | undefined) {
        this.layerData = layerData
        this.resetContents()
    }

    private resetContents() {
        if (this.layerData) {
            this.subviews.forEach(it => it.removeFromSuperview())
            this.renderLayer(this.layerData, this)
        }
    }

    private renderLayer(layer: BaseLayer, superview: XT.View) {
        const view = layer.requestDesignView()
        if (view) {
            view.removeFromSuperview()
            if (superview == this) {
                if (layer instanceof ViewLayer && layer.frame) {
                    view.frame = XT.RectMake((this.bounds.width - layer.frame.width) / 2, (this.bounds.height - layer.frame.height) / 2, layer.frame.width, layer.frame.height)
                }
                else {
                    view.frame = XT.RectMake((this.bounds.width - this.canvasSize.width) / 2, (this.bounds.height - this.canvasSize.height) / 2, this.canvasSize.width, this.canvasSize.height)
                }
            }
            superview.addSubview(view)
            layer.children.forEach(it => {
                this.renderLayer(it, view);
            })
        }
    }

}