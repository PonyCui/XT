import { View } from "./View";
import { LayoutConstraintAxis } from "./LayoutConstraintAxis";
import { RectMake } from "../interface/Rect";

export enum StackViewDistribution {
    Fill,
    FillEqually,
    FillProportionally,
    EqualSpacing,
}

export enum StackViewAlignment {
    Fill,
    Leading,
    Center,
    Trailing,
}

export class StackItem {

    minWidth?: number
    minHeight?: number

    constructor(readonly view: View) { }

}

export class StackView extends View {

    private _axis: LayoutConstraintAxis = LayoutConstraintAxis.Horizontal

    public get axis(): LayoutConstraintAxis {
        return this._axis;
    }

    public set axis(value: LayoutConstraintAxis) {
        this._axis = value;
        this.layoutItems()
    }

    private _distribution: StackViewDistribution = StackViewDistribution.Fill

    public get distribution(): StackViewDistribution {
        return this._distribution;
    }

    public set distribution(value: StackViewDistribution) {
        this._distribution = value;
        this.layoutItems()
    }

    private _alignment: StackViewAlignment = StackViewAlignment.Fill

    public get alignment(): StackViewAlignment {
        return this._alignment;
    }

    public set alignment(value: StackViewAlignment) {
        this._alignment = value;
        this.layoutItems()
    }

    private _spacing: number = 0.0

    public get spacing(): number {
        return this._spacing;
    }

    public set spacing(value: number) {
        this._spacing = value;
        this.layoutItems()
    }

    private innerView = new View

    private items: StackItem[] = []

    constructor() {
        super()
        this.addSubview(this.innerView)
    }

    setItems(items: StackItem[], animated: boolean): void {
        this.innerView.subviews.forEach(it => it.removeFromSuperview())
        items.forEach(it => {
            this.innerView.addSubview(it.view)
        })
        this.items = items
        this.layoutItems(animated)
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.innerView.frame = this.bounds
        this.layoutItems()
    }

    layoutItems(animated: boolean = false) {
        if (this.items.length == 0) { return }
        if (this.axis == LayoutConstraintAxis.Horizontal) {
            switch (this.distribution) {
                case StackViewDistribution.Fill:
                    {
                        let numbersOfDistributable = this.items.filter(it => it.minWidth !== undefined).length
                        if (numbersOfDistributable < this.items.length) {
                            numbersOfDistributable++
                        }
                        const layoutSpace = this.bounds.width - (numbersOfDistributable - 1) * this.spacing
                        const distributableSpace = this.items.map(it => it.minWidth || 0).reduce((a: number, b: number) => a + b, 0)
                        let fillingItem: StackItem | undefined = undefined
                        let currentX = 0.0
                        this.items.forEach(it => {
                            if (it.minWidth === undefined) {
                                if (fillingItem === undefined) {
                                    fillingItem = it
                                    fillingItem.view.frame = RectMake(currentX, it.view.frame.y, layoutSpace - distributableSpace, it.view.frame.height)
                                    currentX += layoutSpace - distributableSpace + this.spacing
                                }
                            }
                            else {
                                it.view.frame = RectMake(currentX, it.view.frame.y, it.minWidth, it.view.frame.height)
                                currentX += it.minWidth + this.spacing
                            }
                        })
                    }
                    break
                case StackViewDistribution.FillEqually:
                    {
                        const layoutSpace = this.bounds.width - (this.items.length - 1) * this.spacing
                        this.items.forEach((it, idx) => {
                            it.view.frame = { ...it.view.frame, x: (layoutSpace / this.items.length + this.spacing) * idx, width: layoutSpace / this.items.length }
                        })
                    }
                    break
                case StackViewDistribution.FillProportionally:
                    {
                        const layoutScale = (this.bounds.width - (this.items.length - 1) * this.spacing) / this.items.map(it => it.minWidth || 0).reduce((a: number, b: number) => a + b, 0)
                        let currentX = 0.0
                        this.items.forEach((it, idx) => {
                            it.view.frame = { ...it.view.frame, x: currentX, width: (it.minWidth || 0) * layoutScale }
                            currentX += it.view.frame.width + this.spacing
                        })
                    }
                    break
                case StackViewDistribution.EqualSpacing:
                    {
                        const layoutSpacing = Math.max(this.spacing, (this.bounds.width - this.items.map(it => it.minWidth || 0).reduce((a: number, b: number) => a + b, 0)) / (this.items.length - 1))
                        if (layoutSpacing < this.spacing) {
                            const layoutScale = (this.bounds.width - (this.items.length - 1) * this.spacing) / this.items.map(it => it.minWidth || 0).reduce((a: number, b: number) => a + b, 0)
                            let currentX = 0.0
                            this.items.forEach((it, idx) => {
                                it.view.frame = { ...it.view.frame, x: currentX, width: (it.minWidth || 0) * layoutScale }
                                currentX += it.view.frame.width + this.spacing
                            })
                        }
                        else {
                            let currentX = 0.0
                            this.items.forEach((it, idx) => {
                                it.view.frame = { ...it.view.frame, x: currentX, width: (it.minWidth || 0) }
                                currentX += it.view.frame.width + layoutSpacing
                            })
                        }
                    }
                    break
            }
            switch (this.alignment) {
                case StackViewAlignment.Fill:
                    this.items.forEach(it => {
                        it.view.frame = { ...it.view.frame, y: 0, height: this.bounds.height }
                    })
                    break
                case StackViewAlignment.Center:
                    this.items.forEach(it => {
                        const itHeight = it.minHeight || it.view.frame.height
                        it.view.frame = { ...it.view.frame, y: (this.bounds.height - itHeight) / 2.0, height: itHeight }
                    })
                    break
                case StackViewAlignment.Leading:
                    this.items.forEach(it => {
                        const itHeight = it.minHeight || it.view.frame.height
                        it.view.frame = { ...it.view.frame, y: 0.0, height: itHeight }
                    })
                    break
                case StackViewAlignment.Trailing:
                    this.items.forEach(it => {
                        const itHeight = it.minHeight || it.view.frame.height
                        it.view.frame = { ...it.view.frame, y: this.bounds.height - itHeight, height: itHeight }
                    })
                    break
            }
        }
        else if (this.axis == LayoutConstraintAxis.Vertical) {
            switch (this.distribution) {
                case StackViewDistribution.Fill:
                    {
                        let numbersOfDistributable = this.items.filter(it => it.minHeight !== undefined).length
                        if (numbersOfDistributable < this.items.length) {
                            numbersOfDistributable++
                        }
                        const layoutSpace = this.bounds.height - (numbersOfDistributable - 1) * this.spacing
                        const distributableSpace = this.items.map(it => it.minHeight || 0).reduce((a: number, b: number) => a + b, 0)
                        let fillingItem: StackItem | undefined = undefined
                        let currentY = 0.0
                        this.items.forEach(it => {
                            if (it.minHeight === undefined) {
                                if (fillingItem === undefined) {
                                    fillingItem = it
                                    fillingItem.view.frame = RectMake(it.view.frame.x, currentY, it.view.frame.width, layoutSpace - distributableSpace)
                                    currentY += layoutSpace - distributableSpace + this.spacing
                                }
                            }
                            else {
                                it.view.frame = RectMake(it.view.frame.x, currentY, it.view.frame.width, it.minHeight)
                                currentY += it.minHeight + this.spacing
                            }
                        })
                    }
                    break
                case StackViewDistribution.FillEqually:
                    {
                        const layoutSpace = this.bounds.height - (this.items.length - 1) * this.spacing
                        this.items.forEach((it, idx) => {
                            it.view.frame = { ...it.view.frame, y: (layoutSpace / this.items.length + this.spacing) * idx, height: layoutSpace / this.items.length }
                        })
                    }
                    break
                case StackViewDistribution.FillProportionally:
                    {
                        const layoutScale = (this.bounds.height - (this.items.length - 1) * this.spacing) / this.items.map(it => it.minHeight || 0).reduce((a: number, b: number) => a + b, 0)
                        let currentY = 0.0
                        this.items.forEach((it, idx) => {
                            it.view.frame = { ...it.view.frame, y: currentY, height: (it.minHeight || 0) * layoutScale }
                            currentY += it.view.frame.height + this.spacing
                        })
                    }
                    break
                case StackViewDistribution.EqualSpacing:
                    {
                        const layoutSpacing = Math.max(this.spacing, (this.bounds.height - this.items.map(it => it.minHeight || 0).reduce((a: number, b: number) => a + b, 0)) / (this.items.length - 1))
                        if (layoutSpacing < this.spacing) {
                            const layoutScale = (this.bounds.height - (this.items.length - 1) * this.spacing) / this.items.map(it => it.minHeight || 0).reduce((a: number, b: number) => a + b, 0)
                            let currentY = 0.0
                            this.items.forEach((it, idx) => {
                                it.view.frame = { ...it.view.frame, y: currentY, height: (it.minHeight || 0) * layoutScale }
                                currentY += it.view.frame.height + this.spacing
                            })
                        }
                        else {
                            let currentY = 0.0
                            this.items.forEach((it, idx) => {
                                it.view.frame = { ...it.view.frame, y: currentY, height: (it.minHeight || 0) }
                                currentY += it.view.frame.height + layoutSpacing
                            })
                        }
                    }
                    break
            }
            switch (this.alignment) {
                case StackViewAlignment.Fill:
                    this.items.forEach(it => {
                        it.view.frame = { ...it.view.frame, x: 0, width: this.bounds.width }
                    })
                    break
                case StackViewAlignment.Center:
                    this.items.forEach(it => {
                        const itWidth = it.minWidth || it.view.frame.width
                        it.view.frame = { ...it.view.frame, x: (this.bounds.width - itWidth) / 2.0, width: itWidth }
                    })
                    break
                case StackViewAlignment.Leading:
                    this.items.forEach(it => {
                        const itWidth = it.minWidth || it.view.frame.width
                        it.view.frame = { ...it.view.frame, x: 0.0, width: itWidth }
                    })
                    break
                case StackViewAlignment.Trailing:
                    this.items.forEach(it => {
                        const itWidth = it.minWidth || it.view.frame.width
                        it.view.frame = { ...it.view.frame, x: this.bounds.width - itWidth, width: itWidth }
                    })
                    break
            }
        }
    }


}