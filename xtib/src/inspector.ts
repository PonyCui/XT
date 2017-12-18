/// <reference path="../../src/xt.d.ts" />
import { Inspectable } from "./entities";


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
                const view = new XT.View(XT.RectMake(0, currentY, 300, 58));
                view.userInteractionEnabled = true;
                const titleLabel = new XT.Label(XT.RectMake(8, 8, 300, 20))
                titleLabel.textColor = new XT.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff);
                titleLabel.font = XT.Font.systemFontOfSize(9);
                titleLabel.text = prop.name
                const textField = new XT.View(XT.RectMake(8, 28, 300 - 16, 32))
                textField.userInteractionEnabled = true;
                textField.backgroundColor = XT.Color.redColor
                textField.onTap = () => {
                    textField.backgroundColor = XT.Color.yellowColor
                }
                // textField.backgroundColor = new XT.Color(0x2e / 0xff, 0x2e / 0xff, 0x2e / 0xff, 0xff);
                // textField.font = XT.Font.systemFontOfSize(12);
                // textField.textColor = new XT.Color(0xc1 / 0xff, 0xc1 / 0xff, 0xc1 / 0xff, 0xff);
                // textField.didBeginEditing = () => {
                //     console.log(textField.text);
                // }
                view.addSubview(titleLabel);
                view.addSubview(textField);
                this.sectionContent.addSubview(view);
                currentY += 58;
            })
            this.sectionContent.contentSize = {width: 0, height: 6000};
        }
    }

}