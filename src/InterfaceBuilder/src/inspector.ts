/// <reference path="../../xt.d.ts" />
import { Inspectable, InspectorStringProperty, InspectorNumberProperty, InspectorBooleanProperty, InspectorEnumProperty, InspectorFourNumberProperty, InspectorHRProperty } from "./entities"


export class Inspector extends UI.View {

    private sectionHeader: UI.View = new UI.View()
    private sectionTitleLabel: UI.Label = new UI.Label()
    private sectionContent: UI.ScrollView = new UI.ScrollView()

    constructor() {
        super()
        this.userInteractionEnabled = true
        this.backgroundColor = new UI.Color(0x17 / 0xff, 0x17 / 0xff, 0x17 / 0xff, 0xff)
        this.sectionTitleLabel.text = "No Item"
        this.addBorder()
        this.addSectionHeader()
        this.addSectionContent()
        this.resetContents()
    }

    private currentItem?: Inspectable = undefined

    public get item(): Inspectable | undefined {
        return this.currentItem
    }

    public set item(value: Inspectable | undefined) {
        if (this.currentItem === value) { return }
        this.currentItem = value
        this.resetContents()
    }

    private addBorder() {
        const borderView = new UI.View()
        borderView.backgroundColor = new UI.Color(0x32 / 0xff, 0x32 / 0xff, 0x32 / 0xff, 0xff)
        this.addSubview(borderView)
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("H:|-0-[borderView(2)]", { borderView }))
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
    }

    private resetContents() {
        this.sectionTitleLabel.text = "No Item"
        this.sectionContent.subviews.forEach(it => it.removeFromSuperview())
        if (this.currentItem) {
            this.sectionTitleLabel.text = this.currentItem.name
            let currentY = 0
            this.currentItem.props.forEach(prop => {
                if (prop instanceof InspectorHRProperty) {
                    const view = new UI.View()
                    view.frame = UI.RectMake(0, currentY, 300, 22)
                    const line = new UI.View()
                    line.frame = UI.RectMake(8, 16, 300 - 16, 1)
                    line.backgroundColor = new UI.Color(1, 1, 1, 0.15)
                    view.addSubview(line)
                    this.sectionContent.addSubview(view)
                    currentY += 22
                    return
                }
                const view = new UI.View()
                view.frame = UI.RectMake(0, currentY, 300, 64)
                view.userInteractionEnabled = true
                const titleLabel = new UI.Label()
                titleLabel.frame = UI.RectMake(8, 8, 300, 20)
                titleLabel.textColor = new UI.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff)
                titleLabel.font = UI.Font.systemFontOfSize(11)
                titleLabel.text = prop.name
                const textField = new UI.TextField()
                textField.frame = UI.RectMake(8, 32, 300 - 16, 32)
                textField.userInteractionEnabled = true
                textField.backgroundColor = new UI.Color(0x2e / 0xff, 0x2e / 0xff, 0x2e / 0xff, 0xff)
                textField.font = UI.Font.systemFontOfSize(12)
                textField.textColor = new UI.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff)
                if (prop instanceof InspectorStringProperty) {
                    if (prop.defaultValue) {
                        textField.text = prop.defaultValue
                    }
                    textField.placeholder = prop.placeholder || ""
                    textField.didEndEditing = () => {
                        prop.valueChanged(textField.text || "")
                    }
                }
                else if (prop instanceof InspectorNumberProperty) {
                    if (typeof prop.defaultValue === "number") {
                        textField.text = prop.defaultValue.toString()
                    }
                    textField.placeholder = prop.placeholder || ""
                    textField.didEndEditing = () => {
                        if (textField.text && !isNaN(parseFloat(textField.text))) {
                            prop.valueChanged(parseFloat(textField.text))
                        }
                    }
                }
                else if (prop instanceof InspectorBooleanProperty) {
                    (textField as any).setOptions(["Yes", "No"], prop.defaultValue === true ? "Yes" : "No")
                    textField.didEndEditing = () => {
                        prop.valueChanged(textField.text === "Yes")
                    }
                }
                else if (prop instanceof InspectorEnumProperty) {
                    (textField as any).setOptions(Object.keys(prop.enumOptions).map((it: any) => prop.enumOptions[it]), prop.enumOptions[prop.defaultValue])
                    textField.didEndEditing = () => {
                        Object.keys(prop.enumOptions).forEach((it: any) => {
                            if (prop.enumOptions[it] === textField.text) {
                                prop.valueChanged(parseInt(it))
                            }
                        })
                    }
                }
                else if (prop instanceof InspectorFourNumberProperty) {
                    const textFields = [textField, new UI.TextField(), new UI.TextField(), new UI.TextField()]
                    textFields[0].frame = UI.RectMake(8, 32, 88, 32)
                    textFields[1].frame = UI.RectMake(88 + 20, 32, 88, 32)
                    textFields[2].frame = UI.RectMake(8, 76, 88, 32)
                    textFields[3].frame = UI.RectMake(88 + 20, 76, 88, 32)
                    textFields.forEach((it, idx) => {
                        it.userInteractionEnabled = true
                        it.backgroundColor = new UI.Color(0x2e / 0xff, 0x2e / 0xff, 0x2e / 0xff, 0xff)
                        it.font = UI.Font.systemFontOfSize(12)
                        it.textColor = new UI.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff)
                        it.placeholder = prop.fourNames[idx] || ""
                        it.text = (typeof prop.fourDefaultValue[idx] === "number" ? prop.fourDefaultValue[idx] : "").toString()
                        it.shouldReturn = () => {
                            it.blur()
                            return true
                        }
                        it.didEndEditing = () => {
                            prop.valueChanged(textFields.map(it =>
                                !isNaN(parseFloat(it.text || "")) ? parseFloat(it.text || "") : 0
                            ))
                        }
                        view.addSubview(it)
                    })
                    view.frame = UI.RectMake(0, currentY, 300, 108)
                    currentY += 44
                }
                textField.shouldReturn = () => {
                    textField.blur()
                    return true
                }
                view.addSubview(titleLabel)
                if (textField.superview == undefined) {
                    view.addSubview(textField)
                }
                this.sectionContent.addSubview(view)
                currentY += 72
            })
            this.sectionContent.contentSize = { width: 0, height: currentY + 12 }
        }
    }

}