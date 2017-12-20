/// <reference path="../../src/xt.d.ts" />

import { BaseLayer } from "./entities";

export class LayerView extends XT.View {

    private sectionHeader: XT.View = new XT.View();
    private sectionTitleLabel: XT.Label = new XT.Label();
    private sectionContent: XT.ScrollView = new XT.ScrollView();
    private layerData: BaseLayer | undefined = undefined
    private openedLayer: any = new (window as any).Set()
    private currentLayer: BaseLayer | undefined = undefined
    private renderedLayers: BaseLayer[] = []

    init() {
        super.init();
        this.userInteractionEnabled = true;
        this.backgroundColor = new XT.Color(0x17 / 0xff, 0x17 / 0xff, 0x17 / 0xff, 0xff);
        this.sectionTitleLabel.text = "Layers";
        this.addBorder();
        this.addSectionHeader();
        this.addSectionContent();
        this.addKeyEventListenner();
    }

    public setLayerData(layerData: BaseLayer | undefined) {
        this.layerData = layerData;
        this.resetContents();
    }

    private addKeyEventListenner() {
        document.addEventListener("keypress", (e) => {
            if (e.keyCode === 43) {
                console.log("require add layer");
            }
            else if (e.keyCode === 95) {
                console.log("require remove layer");
            }
        })
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 37) { // left
                if (this.currentLayer !== undefined) {
                    this.openedLayer.delete(this.currentLayer)
                    this.resetContents();
                }
            }
            else if (e.keyCode == 38) { // top
                if (this.currentLayer !== undefined) {
                    this.selectPrevious();
                }
            }
            else if (e.keyCode == 39) { // right
                if (this.currentLayer !== undefined) {
                    this.openedLayer.add(this.currentLayer)
                    this.resetContents();
                }
            }
            else if (e.keyCode == 40) { // bottom
                if (this.currentLayer !== undefined) {
                    this.selectNext();
                }
            }
        })
    }

    private addBorder() {
        const borderView = new XT.View();
        borderView.backgroundColor = new XT.Color(0x32 / 0xff, 0x32 / 0xff, 0x32 / 0xff, 0xff);
        this.addSubview(borderView);
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("H:|-0-[borderView(2)]", { borderView }));
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[borderView]-0-|", { borderView }));
        this.layoutIfNeeded();
    }

    private addSectionHeader() {
        this.sectionHeader.backgroundColor = new XT.Color(0x2a / 0xff, 0x2a / 0xff, 0x2a / 0xff, 0xff);
        this.addSubview(this.sectionHeader);
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("H:|-0-[sectionHeader]-0-|", { sectionHeader: this.sectionHeader }));
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[sectionHeader(32)]", { sectionHeader: this.sectionHeader }));
        this.sectionTitleLabel.textColor = new XT.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff);
        this.sectionTitleLabel.font = XT.Font.boldSystemFontOfSize(11);
        this.sectionHeader.addSubview(this.sectionTitleLabel);
        this.sectionTitleLabel.frame = XT.RectMake(8, 0, 300, 32);
        this.layoutIfNeeded();
    }

    private addSectionContent() {
        this.sectionContent.userInteractionEnabled = true;
        this.addSubview(this.sectionContent);
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("H:|-0-[sectionContent]-0-|", { sectionContent: this.sectionContent }));
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-32-[sectionContent]-0-|", { sectionContent: this.sectionContent }));
        this.layoutIfNeeded();
        this.sectionContent.onTap = () => {
            this.currentLayer = undefined
            this.resetContents();
        }
    }

    private currentY = 0.0

    private resetContents() {
        this.currentY = 0.0;
        this.renderedLayers = [];
        this.sectionContent.subviews.forEach(it => it.removeFromSuperview())
        if (this.layerData) {
            this.renderLayer(this.layerData, 0);
        }
        this.sectionContent.contentSize = XT.SizeMake(0, this.currentY)
    }

    private selectPrevious() {
        if (this.currentLayer) {
            const idx = this.renderedLayers.indexOf(this.currentLayer)
            if (idx > 0) {
                this.currentLayer = this.renderedLayers[idx - 1];
                this.resetContents();
            }
        }
    }

    private selectNext() {
        if (this.currentLayer) {
            const idx = this.renderedLayers.indexOf(this.currentLayer)
            if (idx >= 0 && idx + 1 < this.renderedLayers.length) {
                this.currentLayer = this.renderedLayers[idx + 1];
                this.resetContents();
            }
        }
    }

    private moveLayerIndicator = new XT.View()

    private renderLayer(layer: BaseLayer, currentLevel: number) {
        const switchButton = new XT.Button(XT.RectMake(2 + currentLevel * 15, this.currentY - 2.5, 24, 28))
        switchButton.color = new XT.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff);
        if (this.openedLayer.has(layer)) {
            switchButton.font = XT.Font.systemFontOfSize(9);
            switchButton.title = "◢";
            switchButton.titleLabel.transform = new XT.TransformMatrix(0.60, 0.0, 0.0, 0.60, 4.0, 4.0)
        }
        else {
            switchButton.font = XT.Font.systemFontOfSize(10);
            switchButton.title = "▷";
            switchButton.titleLabel.transform = new XT.TransformMatrix(0.75, 0.0, 0.0, 0.75, 3.0, 3.0)
        }
        switchButton.onTouchUpInside = () => {
            if (this.openedLayer.has(layer)) {
                this.openedLayer.delete(layer);
            }
            else {
                this.openedLayer.add(layer);
            }
            this.resetContents();
        }
        if (layer.children === undefined || layer.children.length == 0) {
            switchButton.alpha = 0.25
            switchButton.userInteractionEnabled = false
        }
        const nameLabel = new XT.Label(XT.RectMake(12 + currentLevel * 15 + 16, this.currentY, 300, 28));
        nameLabel.textColor = new XT.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff);
        nameLabel.font = XT.Font.systemFontOfSize(10)
        nameLabel.text = layer.name
        nameLabel.userInteractionEnabled = true
        nameLabel.onTap = () => {
            this.currentLayer = layer;
            this.resetContents();
        }
        nameLabel.longPressDuration = 0.15;
        nameLabel.onLongPress = (state: XT.InteractionState, viewLocation?: XT.Point, absLocation?: XT.Point) => {
            if (this.currentLayer != layer) { return }
            if (state == XT.InteractionState.Began) {
                this.moveLayerIndicator.removeFromSuperview();
                nameLabel.addSubview(this.moveLayerIndicator)
                this.moveLayerIndicator.frame = XT.RectMake(0, 14, 300 - nameLabel.frame.x - 16, 2);
                this.moveLayerIndicator.backgroundColor = XT.Color.whiteColor
            }
            else if (state == XT.InteractionState.Changed) {
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
                this.moveLayerIndicator.frame = XT.RectMake(0, y, 300 - nameLabel.frame.x - 16, 2);
                this.moveLayerIndicator.backgroundColor = XT.Color.whiteColor
            }
            else if (state == XT.InteractionState.Ended) {
                this.moveLayerIndicator.removeFromSuperview();
            }
        }
        if (this.currentLayer === layer) {
            const selectedBackgroundView = new XT.View(XT.RectMake(0, this.currentY, 300, 28))
            selectedBackgroundView.backgroundColor = new XT.Color(0x00, 0x36 / 0xff, 0x61 / 0xff, 0xff)
            this.sectionContent.addSubview(selectedBackgroundView)
        }
        this.sectionContent.addSubview(switchButton);
        this.sectionContent.addSubview(nameLabel);
        this.currentY += 28.0;
        this.renderedLayers.push(layer);
        if (this.openedLayer.has(layer)) {
            layer.children.forEach(it => {
                this.renderLayer(it, currentLevel + 1)
            })
        }
    }

}