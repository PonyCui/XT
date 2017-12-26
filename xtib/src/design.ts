/// <reference path="../../src/xt.d.ts" />
import { BaseLayer } from "./entities"
import { ViewLayer } from "./components/ViewLayer";


export class DesignView extends XT.View {

    private layerData: BaseLayer | undefined = undefined
    private layerAdjustingCenterButton = new XT.View()
    private layerAdjustingTopButton = new XT.View()
    private layerAdjustingLeftButton = new XT.View()
    private layerAdjustingBottomButton = new XT.View()
    private layerAdjustingRightButton = new XT.View()
    private layerAdjustingTopLeftButton = new XT.View()
    private layerAdjustingTopRightButton = new XT.View()
    private layerAdjustingBottomLeftButton = new XT.View()
    private layerAdjustingBottomRightButton = new XT.View()
    public canvasSize = XT.SizeMake(375, 667)

    private _currentLayer: BaseLayer | undefined = undefined

    public get currentLayer(): BaseLayer | undefined {
        return this._currentLayer
    }

    public set currentLayer(value: BaseLayer | undefined) {
        this._currentLayer = value
        this.resetContents()
    }

    init() {
        super.init()
        this.userInteractionEnabled = true
        this.setupAdjustingButton();
        this.backgroundColor = new XT.Color(0x17 / 0xff, 0x17 / 0xff, 0x17 / 0xff, 0xff)
    }

    public setupAdjustingButton() {
        this.layerAdjustingCenterButton.userInteractionEnabled = true
        this.layerAdjustingTopButton.backgroundColor = XT.Color.whiteColor
        this.layerAdjustingTopButton.borderWidth = 1
        this.layerAdjustingTopButton.borderColor = XT.Color.grayColor
        this.layerAdjustingLeftButton.backgroundColor = XT.Color.whiteColor
        this.layerAdjustingLeftButton.borderWidth = 1
        this.layerAdjustingLeftButton.borderColor = XT.Color.grayColor
        this.layerAdjustingBottomButton.userInteractionEnabled = true
        this.layerAdjustingBottomButton.backgroundColor = XT.Color.whiteColor
        this.layerAdjustingBottomButton.borderWidth = 1
        this.layerAdjustingBottomButton.borderColor = XT.Color.grayColor
        this.layerAdjustingRightButton.userInteractionEnabled = true
        this.layerAdjustingRightButton.backgroundColor = XT.Color.whiteColor
        this.layerAdjustingRightButton.borderWidth = 1
        this.layerAdjustingRightButton.borderColor = XT.Color.grayColor
        this.layerAdjustingTopLeftButton.backgroundColor = XT.Color.whiteColor
        this.layerAdjustingTopLeftButton.borderWidth = 1
        this.layerAdjustingTopLeftButton.borderColor = XT.Color.grayColor
        this.layerAdjustingTopRightButton.backgroundColor = XT.Color.whiteColor
        this.layerAdjustingTopRightButton.borderWidth = 1
        this.layerAdjustingTopRightButton.borderColor = XT.Color.grayColor
        this.layerAdjustingBottomLeftButton.backgroundColor = XT.Color.whiteColor
        this.layerAdjustingBottomLeftButton.borderWidth = 1
        this.layerAdjustingBottomLeftButton.borderColor = XT.Color.grayColor
        this.layerAdjustingBottomRightButton.backgroundColor = XT.Color.whiteColor
        this.layerAdjustingBottomRightButton.borderWidth = 1
        this.layerAdjustingBottomRightButton.borderColor = XT.Color.grayColor
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
        if (!(layer instanceof ViewLayer)) {
            return;
        }
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
            if (layer === this.currentLayer) {
                this.renderAdjustingButton(view);
                this.resetAdjustingButtonEvents(view, layer);
            }
            layer.children.forEach(it => {
                this.renderLayer(it, view);
            })
        }
    }

    private renderAdjustingButton(onView: XT.View) {
        let windowOrigin = { x: onView.frame.x, y: onView.frame.y };
        let curView = onView.superview;
        while (curView !== undefined) {
            if (curView == this) {
                break
            }
            windowOrigin.x += curView.frame.x
            windowOrigin.y += curView.frame.y
            curView = curView.superview
        }
        this.layerAdjustingTopButton.superview === undefined && this.addSubview(this.layerAdjustingTopButton)
        this.layerAdjustingTopButton.frame = XT.RectMake(windowOrigin.x + onView.frame.width / 2.0 - 3.0, windowOrigin.y - 3.0, 6.0, 6.0)
        this.layerAdjustingLeftButton.superview === undefined && this.addSubview(this.layerAdjustingLeftButton)
        this.layerAdjustingLeftButton.frame = XT.RectMake(windowOrigin.x - 3.0, windowOrigin.y + onView.frame.height / 2.0 - 3.0, 6.0, 6.0)
        this.layerAdjustingBottomButton.superview === undefined && this.addSubview(this.layerAdjustingBottomButton)
        this.layerAdjustingBottomButton.frame = XT.RectMake(windowOrigin.x + onView.frame.width / 2.0 - 3.0, windowOrigin.y + onView.frame.height - 3.0, 6.0, 6.0)
        this.layerAdjustingRightButton.superview === undefined && this.addSubview(this.layerAdjustingRightButton)
        this.layerAdjustingRightButton.frame = XT.RectMake(windowOrigin.x + onView.frame.width - 3.0, windowOrigin.y + onView.frame.height / 2.0 - 3.0, 6.0, 6.0)
        this.layerAdjustingTopLeftButton.superview === undefined && this.addSubview(this.layerAdjustingTopLeftButton)
        this.layerAdjustingTopLeftButton.frame = XT.RectMake(windowOrigin.x - 3.0, windowOrigin.y - 3.0, 6.0, 6.0)
        this.layerAdjustingTopRightButton.superview === undefined && this.addSubview(this.layerAdjustingTopRightButton)
        this.layerAdjustingTopRightButton.frame = XT.RectMake(windowOrigin.x + onView.frame.width - 3.0, windowOrigin.y - 3.0, 6.0, 6.0)
        this.layerAdjustingBottomLeftButton.superview === undefined && this.addSubview(this.layerAdjustingBottomLeftButton)
        this.layerAdjustingBottomLeftButton.frame = XT.RectMake(windowOrigin.x - 3.0, windowOrigin.y + onView.frame.height - 3.0, 6.0, 6.0)
        this.layerAdjustingBottomRightButton.superview === undefined && this.addSubview(this.layerAdjustingBottomRightButton)
        this.layerAdjustingBottomRightButton.frame = XT.RectMake(windowOrigin.x + onView.frame.width - 3.0, windowOrigin.y + onView.frame.height - 3.0, 6.0, 6.0)
        this.layerAdjustingCenterButton.superview === undefined && this.addSubview(this.layerAdjustingCenterButton)
        this.layerAdjustingCenterButton.frame = XT.RectMake(windowOrigin.x, windowOrigin.y, onView.frame.width, onView.frame.height)
    }

    private resetAdjustingButtonEvents(onView: XT.View, layer: ViewLayer) {
        let touchStartPoint: XT.Point = { x: 0, y: 0 }
        let touchStartFrame: XT.Rect = XT.RectZero
        this.layerAdjustingCenterButton.onPan = (state, viewLocation, absLocation) => {
            if (state == XT.InteractionState.Began) {
                touchStartPoint = absLocation
                touchStartFrame = onView.frame
            }
            else if (state == XT.InteractionState.Changed) {
                const movePoint = { x: absLocation.x - touchStartPoint.x, y: absLocation.y - touchStartPoint.y }
                onView.frame = { ...onView.frame, x: touchStartFrame.x + movePoint.x, y: touchStartFrame.y + movePoint.y }
                this.renderAdjustingButton(onView)
            }
            else if (state == XT.InteractionState.Ended) {
                layer.frame = onView.frame
                layer.propsDidChange && layer.propsDidChange()
            }
        }
        this.layerAdjustingRightButton.onPan = (state, viewLocation, absLocation) => {
            if (state == XT.InteractionState.Began) {
                touchStartPoint = absLocation
                touchStartFrame = onView.frame
            }
            else if (state == XT.InteractionState.Changed) {
                const movePoint = { x: absLocation.x - touchStartPoint.x, y: absLocation.y - touchStartPoint.y }
                onView.frame = { ...onView.frame, width: Math.max(0.0, touchStartFrame.width + movePoint.x) }
                this.renderAdjustingButton(onView)
            }
            else if (state == XT.InteractionState.Ended) {
                layer.frame = onView.frame
                layer.propsDidChange && layer.propsDidChange()
            }
        }
        this.layerAdjustingBottomButton.onPan = (state, viewLocation, absLocation) => {
            if (state == XT.InteractionState.Began) {
                touchStartPoint = absLocation
                touchStartFrame = onView.frame
            }
            else if (state == XT.InteractionState.Changed) {
                const movePoint = { x: absLocation.x - touchStartPoint.x, y: absLocation.y - touchStartPoint.y }
                onView.frame = { ...onView.frame, height: Math.max(0.0, touchStartFrame.height + movePoint.y) }
                this.renderAdjustingButton(onView)
            }
            else if (state == XT.InteractionState.Ended) {
                layer.frame = onView.frame
                layer.propsDidChange && layer.propsDidChange()
            }
        }
    }

}