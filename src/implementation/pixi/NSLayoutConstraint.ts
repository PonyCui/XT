import * as I from '../../interface/Abstract'
declare function require(name: string): any;
const AutoLayout = require("autolayout");

export class NSLayoutConstraint extends I.NSLayoutConstraint {

    private static fromALObject(obj: any, views: { [key: string]: I.UIView }): NSLayoutConstraint {
        const toAttr = (attr: string): any => {
            if (attr == "const") { return I.NSLayoutConstraint.Attribute.Const }
            if (attr == "left") { return I.NSLayoutConstraint.Attribute.Left }
            if (attr == "right") { return I.NSLayoutConstraint.Attribute.Right }
            if (attr == "top") { return I.NSLayoutConstraint.Attribute.Top }
            if (attr == "bottom") { return I.NSLayoutConstraint.Attribute.Bottom }
            if (attr == "width") { return I.NSLayoutConstraint.Attribute.Width }
            if (attr == "height") { return I.NSLayoutConstraint.Attribute.Height }
            if (attr == "centerX") { return I.NSLayoutConstraint.Attribute.CenterX }
            if (attr == "centerY") { return I.NSLayoutConstraint.Attribute.CenterY }
        }
        const toRelation = (rel: string): any => {
            if (rel == "leq") { return I.NSLayoutConstraint.Relation.Less }
            if (rel == "geq") { return I.NSLayoutConstraint.Relation.Greater }
            return I.NSLayoutConstraint.Relation.Equal;
        }
        const constant = obj.constant == "default" ? 8 : parseInt(obj.constant);
        const layoutConstraint = new NSLayoutConstraint(views[obj.view1], toAttr(obj.attr1), toRelation(obj.relation), views[obj.view2], toAttr(obj.attr2), constant, obj.multiplier);
        layoutConstraint.priority = obj.priority || 750
        return layoutConstraint;
    }

    static constraintsWithVisualFormat(format: string, views: { [key: string]: I.UIView }): NSLayoutConstraint[] {
        try {
            const result = AutoLayout.VisualFormat.parse(format);
            return result.map((item: any) => {
                return NSLayoutConstraint.fromALObject(item, views)
            })
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    toALObject(): Object {
        const toAttr = (attr?: any): string | undefined => {
            if (attr == I.NSLayoutConstraint.Attribute.Const) { return "const" }
            if (attr == I.NSLayoutConstraint.Attribute.Left) { return "left" }
            if (attr == I.NSLayoutConstraint.Attribute.Right) { return "right" }
            if (attr == I.NSLayoutConstraint.Attribute.Top) { return "top" }
            if (attr == I.NSLayoutConstraint.Attribute.Bottom) { return "bottom" }
            if (attr == I.NSLayoutConstraint.Attribute.Width) { return "width" }
            if (attr == I.NSLayoutConstraint.Attribute.Height) { return "height" }
            if (attr == I.NSLayoutConstraint.Attribute.CenterX) { return "centerX" }
            if (attr == I.NSLayoutConstraint.Attribute.CenterY) { return "centerY" }
            return undefined;
        }
        const toRelation = (rel: any): string => {
            if (rel == I.NSLayoutConstraint.Relation.Equal) { return "equ" }
            else if (rel == I.NSLayoutConstraint.Relation.Less) { return "leq" }
            else if (rel == I.NSLayoutConstraint.Relation.Greater) { return "geq" }
            return "equ"
        }
        return {
            view1: this.firstItem !== undefined ? (this.firstItem as any)._layoutID : undefined,
            attr1: toAttr(this.firstAttr),
            relation: toRelation(this.relation),
            view2: this.secondItem !== undefined ? (this.secondItem as any)._layoutID : undefined,
            attr2: toAttr(this.secondAttr),
            multiplier: this.multiplier,
            constant: this.constant,
            priority: this.priority,
        }
    }

}