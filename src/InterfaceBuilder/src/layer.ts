/// <reference path="../../xt.d.ts" />

import { BaseLayer } from "./entities"

export interface LayerDelegate {

    layerViewDidSelectLayer(layer: BaseLayer | undefined): void
    layerViewRequireAddLayer(onLayer: BaseLayer): void
    layerViewRequireRemoveLayer(removeLayer: BaseLayer): void

}

export class LayerView extends UI.View {

    public delegate?: LayerDelegate = undefined
    private sectionHeader: UI.View = new UI.View()
    private sectionTitleLabel: UI.Label = new UI.Label()
    private sectionContent: UI.ScrollView = new UI.ScrollView()
    private layerData: BaseLayer | undefined = undefined
    private openedLayer: any = new (window as any).Set()
    private _currentLayer: BaseLayer | undefined = undefined
    private get currentLayer(): BaseLayer | undefined {
        return this._currentLayer
    }
    private set currentLayer(value: BaseLayer | undefined) {
        this._currentLayer = value
        this.resetContents()
        if (this.delegate) {
            this.delegate.layerViewDidSelectLayer(value)
        }
    }
    private renderedLayers: BaseLayer[] = []

    constructor() {
        super()
        this.userInteractionEnabled = true
        this.backgroundColor = new UI.Color(0x17 / 0xff, 0x17 / 0xff, 0x17 / 0xff, 0xff)
        this.sectionTitleLabel.text = "Layers"
        this.addBorder()
        this.addSectionHeader()
        this.addSectionContent()
        this.addKeyEventListenner()
    }

    public setLayerData(layerData: BaseLayer | undefined) {
        this.layerData = layerData
        this.resetContents()
    }

    private addKeyEventListenner() {
        document.addEventListener("keypress", (e) => {
            if (e.keyCode === 43) { // +
                if (this.currentLayer && this.delegate) {
                    this.openedLayer.add(this.currentLayer)
                    this.delegate.layerViewRequireAddLayer(this.currentLayer)
                }
            }
            else if (e.keyCode === 95) { // -
                if (this.currentLayer && this.delegate) {
                    const currentLayer = this.currentLayer
                    this.selectPrevious()
                    this.delegate.layerViewRequireRemoveLayer(currentLayer)
                }
            }
        })
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 37) { // left
                if (this.currentLayer !== undefined) {
                    this.openedLayer.delete(this.currentLayer)
                    this.resetContents()
                }
            }
            else if (e.keyCode == 38) { // top
                if (this.currentLayer !== undefined) {
                    this.selectPrevious()
                }
            }
            else if (e.keyCode == 39) { // right
                if (this.currentLayer !== undefined) {
                    this.openedLayer.add(this.currentLayer)
                    this.resetContents()
                }
            }
            else if (e.keyCode == 40) { // bottom
                if (this.currentLayer !== undefined) {
                    this.selectNext()
                }
            }
        })
    }

    private addBorder() {
        const borderView = new UI.View()
        borderView.backgroundColor = new UI.Color(0x32 / 0xff, 0x32 / 0xff, 0x32 / 0xff, 0xff)
        this.addSubview(borderView)
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("H:[borderView(2)]-0-|", { borderView }))
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[borderView]-0-|", { borderView }))
        this.layoutIfNeeded()
    }

    private addSectionHeader() {
        this.sectionHeader.backgroundColor = new UI.Color(0x2a / 0xff, 0x2a / 0xff, 0x2a / 0xff, 0xff)
        this.addSubview(this.sectionHeader)
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("H:|-0-[sectionHeader]-0-|", { sectionHeader: this.sectionHeader }))
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[sectionHeader(32)]", { sectionHeader: this.sectionHeader }))
        this.sectionTitleLabel.textColor = new UI.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff)
        this.sectionTitleLabel.font = UI.Font.boldSystemFontOfSize(11)
        this.sectionHeader.addSubview(this.sectionTitleLabel)
        this.sectionTitleLabel.frame = UI.RectMake(8, 0, 300, 32)
        this.layoutIfNeeded()
    }

    private addSectionContent() {
        this.sectionContent.userInteractionEnabled = true
        this.addSubview(this.sectionContent)
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("H:|-0-[sectionContent]-0-|", { sectionContent: this.sectionContent }))
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("V:|-32-[sectionContent]-0-|", { sectionContent: this.sectionContent }))
        this.layoutIfNeeded()
        this.sectionContent.onTap = () => {
            this.currentLayer = undefined
        }
    }

    private currentY = 0.0

    private resetContents() {
        this.currentY = 0.0
        this.renderedLayers = []
        this.sectionContent.subviews.forEach(it => it.removeFromSuperview())
        if (this.layerData) {
            this.renderLayer(this.layerData, 0)
        }
        this.sectionContent.contentSize = UI.SizeMake(0, this.currentY)
    }

    public selectLayer(layer: BaseLayer) {
        this.currentLayer = layer
    }

    private selectPrevious() {
        if (this.currentLayer) {
            const idx = this.renderedLayers.indexOf(this.currentLayer)
            if (idx > 0) {
                this.currentLayer = this.renderedLayers[idx - 1]
            }
        }
    }

    private selectNext() {
        if (this.currentLayer) {
            const idx = this.renderedLayers.indexOf(this.currentLayer)
            if (idx >= 0 && idx + 1 < this.renderedLayers.length) {
                this.currentLayer = this.renderedLayers[idx + 1]
            }
        }
    }

    private moveLayerIndicator = new UI.View()

    private renderLayer(layer: BaseLayer, currentLevel: number) {
        const switchButton = new UI.Button()
        switchButton.frame = UI.RectMake(2 + currentLevel * 15, this.currentY - 2.5, 24, 28)
        switchButton.color = new UI.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff)
        if (this.openedLayer.has(layer)) {
            switchButton.font = UI.Font.systemFontOfSize(9)
            switchButton.title = "◢"
            switchButton.titleLabel.transform = new UI.TransformMatrix(0.60, 0.0, 0.0, 0.60, 4.0, 4.0)
        }
        else {
            switchButton.font = UI.Font.systemFontOfSize(10)
            switchButton.title = "▷"
            switchButton.titleLabel.transform = new UI.TransformMatrix(0.75, 0.0, 0.0, 0.75, 3.0, 3.0)
        }
        switchButton.onTouchUpInside = () => {
            if (this.openedLayer.has(layer)) {
                this.openedLayer.delete(layer)
            }
            else {
                this.openedLayer.add(layer)
            }
            this.resetContents()
        }
        if (layer.children === undefined || layer.children.length == 0) {
            switchButton.alpha = 0.25
            switchButton.userInteractionEnabled = false
        }
        const nameLabel = new UI.Label()
        nameLabel.frame = UI.RectMake(12 + currentLevel * 15 + 16, this.currentY, 300, 28)
        nameLabel.textColor = new UI.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff)
        nameLabel.font = UI.Font.systemFontOfSize(10)
        nameLabel.text = layer.name
        nameLabel.userInteractionEnabled = true
        nameLabel.onTap = () => {
            this.currentLayer = layer
        }
        nameLabel.longPressDuration = 0.15
        nameLabel.onLongPress = (state: UI.InteractionState, viewLocation: any, absLocation: UI.Point) => {
            if (this.currentLayer != layer) { return }
            if (state == UI.InteractionState.Began) {
                this.moveLayerIndicator.removeFromSuperview()
                nameLabel.addSubview(this.moveLayerIndicator)
                this.moveLayerIndicator.frame = UI.RectMake(0, 14, 300 - nameLabel.frame.x - 16, 2)
                this.moveLayerIndicator.backgroundColor = UI.Color.whiteColor
            }
            else if (state == UI.InteractionState.Changed) {
                let y = viewLocation ? viewLocation.y : 0.0
                if (y > 0.0 && y < 28.0) {
                    y = 14.0
                }
                else {
                    y = Math.floor(y / 28) * 28
                }
                if (this.moveLayerIndicator.superview === undefined) {
                    nameLabel.addSubview(this.moveLayerIndicator)
                }
                this.moveLayerIndicator.frame = UI.RectMake(0, y, 300 - nameLabel.frame.x - 16, 2)
                this.moveLayerIndicator.backgroundColor = UI.Color.whiteColor
            }
            else if (state == UI.InteractionState.Ended) {
                this.moveLayerIndicator.removeFromSuperview()
            }
        }
        if (this.currentLayer === layer) {
            const selectedBackgroundView = new UI.View()
            selectedBackgroundView.frame = UI.RectMake(0, this.currentY, 300, 28)
            selectedBackgroundView.backgroundColor = new UI.Color(0x00, 0x36 / 0xff, 0x61 / 0xff, 0xff)
            this.sectionContent.addSubview(selectedBackgroundView)
        }
        this.sectionContent.addSubview(switchButton)
        this.sectionContent.addSubview(nameLabel)
        this.currentY += 28.0
        this.renderedLayers.push(layer)
        if (this.openedLayer.has(layer)) {
            layer.children.forEach(it => {
                this.renderLayer(it, currentLevel + 1)
            })
        }
    }

}