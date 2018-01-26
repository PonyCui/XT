/// <reference path="../../xt.d.ts" />
import { BaseLayer } from "./entities"
import { ViewLayer } from "./components/ViewLayer";


export class DesignView extends UI.View {

    private layerData: BaseLayer | undefined = undefined
    private layerAdjustingCenterButton = new UI.View()
    private layerAdjustingTopButton = new UI.View()
    private layerAdjustingLeftButton = new UI.View()
    private layerAdjustingBottomButton = new UI.View()
    private layerAdjustingRightButton = new UI.View()
    private layerAdjustingTopLeftButton = new UI.View()
    private layerAdjustingTopRightButton = new UI.View()
    private layerAdjustingBottomLeftButton = new UI.View()
    private layerAdjustingBottomRightButton = new UI.View()
    public canvasSize = UI.SizeMake(375, 667)

    private _currentLayer: BaseLayer | undefined = undefined

    public get currentLayer(): BaseLayer | undefined {
        return this._currentLayer
    }

    public set currentLayer(value: BaseLayer | undefined) {
        this._currentLayer = value
        this.resetContents()
    }

    constructor() {
        super()
        this.userInteractionEnabled = true
        this.setupAdjustingButton();
        this.backgroundColor = new UI.Color(0x17 / 0xff, 0x17 / 0xff, 0x17 / 0xff, 0xff)
    }

    public setupAdjustingButton() {
        this.layerAdjustingCenterButton.userInteractionEnabled = true
        this.layerAdjustingTopButton.backgroundColor = UI.Color.whiteColor
        this.layerAdjustingTopButton.borderWidth = 1
        this.layerAdjustingTopButton.borderColor = UI.Color.grayColor
        this.layerAdjustingLeftButton.backgroundColor = UI.Color.whiteColor
        this.layerAdjustingLeftButton.borderWidth = 1
        this.layerAdjustingLeftButton.borderColor = UI.Color.grayColor
        this.layerAdjustingBottomButton.userInteractionEnabled = true
        this.layerAdjustingBottomButton.backgroundColor = UI.Color.whiteColor
        this.layerAdjustingBottomButton.borderWidth = 1
        this.layerAdjustingBottomButton.borderColor = UI.Color.grayColor
        this.layerAdjustingRightButton.userInteractionEnabled = true
        this.layerAdjustingRightButton.backgroundColor = UI.Color.whiteColor
        this.layerAdjustingRightButton.borderWidth = 1
        this.layerAdjustingRightButton.borderColor = UI.Color.grayColor
        this.layerAdjustingTopLeftButton.backgroundColor = UI.Color.whiteColor
        this.layerAdjustingTopLeftButton.borderWidth = 1
        this.layerAdjustingTopLeftButton.borderColor = UI.Color.grayColor
        this.layerAdjustingTopRightButton.backgroundColor = UI.Color.whiteColor
        this.layerAdjustingTopRightButton.borderWidth = 1
        this.layerAdjustingTopRightButton.borderColor = UI.Color.grayColor
        this.layerAdjustingBottomLeftButton.backgroundColor = UI.Color.whiteColor
        this.layerAdjustingBottomLeftButton.borderWidth = 1
        this.layerAdjustingBottomLeftButton.borderColor = UI.Color.grayColor
        this.layerAdjustingBottomRightButton.backgroundColor = UI.Color.whiteColor
        this.layerAdjustingBottomRightButton.borderWidth = 1
        this.layerAdjustingBottomRightButton.borderColor = UI.Color.grayColor
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

    private renderLayer(layer: BaseLayer, superview: UI.View) {
        if (!(layer instanceof ViewLayer)) {
            return;
        }
        const view = layer.requestDesignView()
        if (view) {
            view.removeFromSuperview()
            if (superview == this) {
                if (layer instanceof ViewLayer && layer.frame) {
                    view.frame = UI.RectMake((this.bounds.width - layer.frame.width) / 2, (this.bounds.height - layer.frame.height) / 2, layer.frame.width, layer.frame.height)
                }
                else {
                    view.frame = UI.RectMake((this.bounds.width - this.canvasSize.width) / 2, (this.bounds.height - this.canvasSize.height) / 2, this.canvasSize.width, this.canvasSize.height)
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

    private renderAdjustingButton(onView: UI.View) {
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
        this.layerAdjustingTopButton.frame = UI.RectMake(windowOrigin.x + onView.frame.width / 2.0 - 3.0, windowOrigin.y - 3.0, 6.0, 6.0)
        this.layerAdjustingLeftButton.superview === undefined && this.addSubview(this.layerAdjustingLeftButton)
        this.layerAdjustingLeftButton.frame = UI.RectMake(windowOrigin.x - 3.0, windowOrigin.y + onView.frame.height / 2.0 - 3.0, 6.0, 6.0)
        this.layerAdjustingBottomButton.superview === undefined && this.addSubview(this.layerAdjustingBottomButton)
        this.layerAdjustingBottomButton.frame = UI.RectMake(windowOrigin.x + onView.frame.width / 2.0 - 3.0, windowOrigin.y + onView.frame.height - 3.0, 6.0, 6.0)
        this.layerAdjustingRightButton.superview === undefined && this.addSubview(this.layerAdjustingRightButton)
        this.layerAdjustingRightButton.frame = UI.RectMake(windowOrigin.x + onView.frame.width - 3.0, windowOrigin.y + onView.frame.height / 2.0 - 3.0, 6.0, 6.0)
        this.layerAdjustingTopLeftButton.superview === undefined && this.addSubview(this.layerAdjustingTopLeftButton)
        this.layerAdjustingTopLeftButton.frame = UI.RectMake(windowOrigin.x - 3.0, windowOrigin.y - 3.0, 6.0, 6.0)
        this.layerAdjustingTopRightButton.superview === undefined && this.addSubview(this.layerAdjustingTopRightButton)
        this.layerAdjustingTopRightButton.frame = UI.RectMake(windowOrigin.x + onView.frame.width - 3.0, windowOrigin.y - 3.0, 6.0, 6.0)
        this.layerAdjustingBottomLeftButton.superview === undefined && this.addSubview(this.layerAdjustingBottomLeftButton)
        this.layerAdjustingBottomLeftButton.frame = UI.RectMake(windowOrigin.x - 3.0, windowOrigin.y + onView.frame.height - 3.0, 6.0, 6.0)
        this.layerAdjustingBottomRightButton.superview === undefined && this.addSubview(this.layerAdjustingBottomRightButton)
        this.layerAdjustingBottomRightButton.frame = UI.RectMake(windowOrigin.x + onView.frame.width - 3.0, windowOrigin.y + onView.frame.height - 3.0, 6.0, 6.0)
        this.layerAdjustingCenterButton.superview === undefined && this.addSubview(this.layerAdjustingCenterButton)
        this.layerAdjustingCenterButton.frame = UI.RectMake(windowOrigin.x, windowOrigin.y, onView.frame.width, onView.frame.height)
    }

    private resetAdjustingButtonEvents(onView: UI.View, layer: ViewLayer) {
        let touchStartPoint: UI.Point = { x: 0, y: 0 }
        let touchStartFrame: UI.Rect = UI.RectZero
        this.layerAdjustingCenterButton.onPan = (state, viewLocation, absLocation) => {
            if (state == UI.InteractionState.Began) {
                touchStartPoint = absLocation
                touchStartFrame = onView.frame
            }
            else if (state == UI.InteractionState.Changed) {
                const movePoint = { x: absLocation.x - touchStartPoint.x, y: absLocation.y - touchStartPoint.y }
                onView.frame = { ...onView.frame, x: touchStartFrame.x + movePoint.x, y: touchStartFrame.y + movePoint.y }
                this.renderAdjustingButton(onView)
            }
            else if (state == UI.InteractionState.Ended) {
                layer.frame = onView.frame
                layer.propsDidChange && layer.propsDidChange()
            }
        }
        this.layerAdjustingRightButton.onPan = (state, viewLocation, absLocation) => {
            if (state == UI.InteractionState.Began) {
                touchStartPoint = absLocation
                touchStartFrame = onView.frame
            }
            else if (state == UI.InteractionState.Changed) {
                const movePoint = { x: absLocation.x - touchStartPoint.x, y: absLocation.y - touchStartPoint.y }
                onView.frame = { ...onView.frame, width: Math.max(0.0, touchStartFrame.width + movePoint.x) }
                this.renderAdjustingButton(onView)
            }
            else if (state == UI.InteractionState.Ended) {
                layer.frame = onView.frame
                layer.propsDidChange && layer.propsDidChange()
            }
        }
        this.layerAdjustingBottomButton.onPan = (state, viewLocation, absLocation) => {
            if (state == UI.InteractionState.Began) {
                touchStartPoint = absLocation
                touchStartFrame = onView.frame
            }
            else if (state == UI.InteractionState.Changed) {
                const movePoint = { x: absLocation.x - touchStartPoint.x, y: absLocation.y - touchStartPoint.y }
                onView.frame = { ...onView.frame, height: Math.max(0.0, touchStartFrame.height + movePoint.y) }
                this.renderAdjustingButton(onView)
            }
            else if (state == UI.InteractionState.Ended) {
                layer.frame = onView.frame
                layer.propsDidChange && layer.propsDidChange()
            }
        }
    }

}