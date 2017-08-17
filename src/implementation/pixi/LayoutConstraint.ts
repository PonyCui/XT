import * as I from '../../interface/Abstract'
declare function require(name: string): any;
const AutoLayout = require("autolayout");

export class LayoutConstraint extends I.LayoutConstraint {

    private static fromALObject(obj: any, views: { [key: string]: I.View }): LayoutConstraint {
        const toAttr = (attr: string): any => {
            if (attr == "const") { return I.LayoutConstraint.Attribute.Const }
            if (attr == "left") { return I.LayoutConstraint.Attribute.Left }
            if (attr == "right") { return I.LayoutConstraint.Attribute.Right }
            if (attr == "top") { return I.LayoutConstraint.Attribute.Top }
            if (attr == "bottom") { return I.LayoutConstraint.Attribute.Bottom }
            if (attr == "width") { return I.LayoutConstraint.Attribute.Width }
            if (attr == "height") { return I.LayoutConstraint.Attribute.Height }
            if (attr == "centerX") { return I.LayoutConstraint.Attribute.CenterX }
            if (attr == "centerY") { return I.LayoutConstraint.Attribute.CenterY }
        }
        const toRelation = (rel: string): any => {
            if (rel == "leq") { return I.LayoutConstraint.Relation.Less }
            if (rel == "geq") { return I.LayoutConstraint.Relation.Greater }
            return I.LayoutConstraint.Relation.Equal;
        }
        const constant = obj.constant == "default" ? 8 : parseInt(obj.constant);
        const layoutConstraint = new LayoutConstraint(views[obj.view1], toAttr(obj.attr1), toRelation(obj.relation), views[obj.view2], toAttr(obj.attr2), constant, obj.multiplier);
        layoutConstraint.priority = obj.priority || 750
        return layoutConstraint;
    }

    static constraintsWithVisualFormat(format: string, views: { [key: string]: I.View }): LayoutConstraint[] {
        try {
            const result = AutoLayout.VisualFormat.parse(format);
            return result.map((item: any) => {
                return LayoutConstraint.fromALObject(item, views)
            })
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    toALObject(): Object {
        const toAttr = (attr?: any): string | undefined => {
            if (attr == I.LayoutConstraint.Attribute.Const) { return "const" }
            if (attr == I.LayoutConstraint.Attribute.Left) { return "left" }
            if (attr == I.LayoutConstraint.Attribute.Right) { return "right" }
            if (attr == I.LayoutConstraint.Attribute.Top) { return "top" }
            if (attr == I.LayoutConstraint.Attribute.Bottom) { return "bottom" }
            if (attr == I.LayoutConstraint.Attribute.Width) { return "width" }
            if (attr == I.LayoutConstraint.Attribute.Height) { return "height" }
            if (attr == I.LayoutConstraint.Attribute.CenterX) { return "centerX" }
            if (attr == I.LayoutConstraint.Attribute.CenterY) { return "centerY" }
            return undefined;
        }
        const toRelation = (rel: any): string => {
            if (rel == I.LayoutConstraint.Relation.Equal) { return "equ" }
            else if (rel == I.LayoutConstraint.Relation.Less) { return "leq" }
            else if (rel == I.LayoutConstraint.Relation.Greater) { return "geq" }
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