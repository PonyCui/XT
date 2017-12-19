/// <reference path="../../src/xt.d.ts" />
import { Inspectable, InspectorStringProperty, InspectorNumberProperty, InspectorBooleanProperty, InspectorEnumProperty } from "./entities";


export class Inspector extends XT.View {

    private sectionHeader: XT.View = new XT.View();
    private sectionTitleLabel: XT.Label = new XT.Label();
    private sectionContent: XT.ScrollView = new XT.ScrollView();

    init() {
        super.init();
        this.userInteractionEnabled = true;
        this.backgroundColor = new XT.Color(0x17 / 0xff, 0x17 / 0xff, 0x17 / 0xff, 0xff);
        this.sectionTitleLabel.text = "No Item";
        this.addBorder();
        this.addSectionHeader();
        this.addSectionContent();
        this.resetContents();
    }

    private currentItem?: Inspectable = undefined

    public get item(): Inspectable | undefined {
        return this.currentItem;
    }

    public set item(value: Inspectable | undefined) {
        if (this.currentItem === value) { return; }
        this.currentItem = value;
        this.resetContents();
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
    }

    private resetContents() {
        this.sectionTitleLabel.text = "No Item";
        this.sectionContent.subviews.forEach(it => it.removeFromSuperview());
        if (this.currentItem) {
            this.sectionTitleLabel.text = this.currentItem.name;
            let currentY = 0;
            this.currentItem.props.forEach(prop => {
                const view = new XT.View(XT.RectMake(0, currentY, 300, 64));
                view.userInteractionEnabled = true;
                const titleLabel = new XT.Label(XT.RectMake(8, 8, 300, 20))
                titleLabel.textColor = new XT.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff);
                titleLabel.font = XT.Font.systemFontOfSize(11);
                titleLabel.text = prop.name
                const textField = new XT.TextField(XT.RectMake(8, 32, 300 - 16, 32))
                textField.userInteractionEnabled = true;
                textField.backgroundColor = new XT.Color(0x2e / 0xff, 0x2e / 0xff, 0x2e / 0xff, 0xff);
                textField.font = XT.Font.systemFontOfSize(12);
                textField.textColor = new XT.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff);
                if (prop instanceof InspectorStringProperty) {
                    if (prop.defaultValue) {
                        textField.text = prop.defaultValue
                    }
                    textField.placeholder = prop.placeholder
                    textField.didEndEditing = () => {
                        prop.valueChanged(textField.text || "")
                    }
                }
                else if (prop instanceof InspectorNumberProperty) {
                    if (prop.defaultValue) {
                        textField.text = prop.defaultValue.toString()
                    }
                    textField.placeholder = prop.placeholder
                    textField.didEndEditing = () => {
                        if (textField.text && !isNaN(parseFloat(textField.text))) {
                            prop.valueChanged(parseFloat(textField.text))
                        }
                    }
                }
                else if (prop instanceof InspectorBooleanProperty) {
                    (textField as any).setOptions(["TRUE", "FALSE"], prop.defaultValue === true ? "TRUE" : "FALSE");
                    textField.didEndEditing = () => {
                        prop.valueChanged(textField.text === "TRUE")
                    }
                }
                else if (prop instanceof InspectorEnumProperty) {
                    (textField as any).setOptions(Object.keys(prop.enumOptions).map(it => prop.enumOptions[it]), prop.enumOptions[prop.defaultValue]);
                    textField.didEndEditing = () => {
                        Object.keys(prop.enumOptions).forEach(it => {
                            if (prop.enumOptions[it] === textField.text) {
                                prop.valueChanged(parseInt(it))
                            }
                        })
                    }
                }
                textField.shouldReturn = () => {
                    textField.blur()
                    return true
                }
                view.addSubview(titleLabel);
                view.addSubview(textField);
                this.sectionContent.addSubview(view);
                currentY += 64;
            })
            this.sectionContent.contentSize = { width: 0, height: currentY };
        }
    }

}