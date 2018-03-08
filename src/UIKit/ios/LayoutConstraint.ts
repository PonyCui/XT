import { LayoutConstraint as ILayoutConstraint, LayoutAttribute, LayoutRelation } from "../interface/LayoutConstraint";
import { View } from "./View";
const AutoLayout = require("autolayout");

export class LayoutConstraint extends ILayoutConstraint {

    private static fromALObject(obj: any, views: { [key: string]: View }): LayoutConstraint {
        const toAttr = (attr: string): any => {
            if (attr == "const") { return LayoutAttribute.Const }
            if (attr == "left") { return LayoutAttribute.Left }
            if (attr == "right") { return LayoutAttribute.Right }
            if (attr == "top") { return LayoutAttribute.Top }
            if (attr == "bottom") { return LayoutAttribute.Bottom }
            if (attr == "width") { return LayoutAttribute.Width }
            if (attr == "height") { return LayoutAttribute.Height }
            if (attr == "centerX") { return LayoutAttribute.CenterX }
            if (attr == "centerY") { return LayoutAttribute.CenterY }
        }
        const toLayoutRelation = (rel: string): any => {
            if (rel == "leq") { return LayoutRelation.Less }
            if (rel == "geq") { return LayoutRelation.Greater }
            return LayoutRelation.Equal;
        }
        const constant = obj.constant == "default" ? 8 : parseInt(obj.constant);
        const layoutConstraint = new LayoutConstraint(views[obj.view1] as any, toAttr(obj.attr1), toLayoutRelation(obj.relation), views[obj.view2] as any, toAttr(obj.attr2), constant, obj.multiplier);
        layoutConstraint.priority = obj.priority || 750
        return layoutConstraint;
    }

    static constraintsWithVisualFormat(format: string, views: { [key: string]: View | any }): LayoutConstraint[] {
        try {
            const result = AutoLayout.VisualFormat.parse(format, {extended: true});
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
            if (attr == LayoutAttribute.Const) { return "const" }
            if (attr == LayoutAttribute.Left) { return "left" }
            if (attr == LayoutAttribute.Right) { return "right" }
            if (attr == LayoutAttribute.Top) { return "top" }
            if (attr == LayoutAttribute.Bottom) { return "bottom" }
            if (attr == LayoutAttribute.Width) { return "width" }
            if (attr == LayoutAttribute.Height) { return "height" }
            if (attr == LayoutAttribute.CenterX) { return "centerX" }
            if (attr == LayoutAttribute.CenterY) { return "centerY" }
            return undefined;
        }
        const toLayoutRelation = (rel: any): string => {
            if (rel == LayoutRelation.Equal) { return "equ" }
            else if (rel == LayoutRelation.Less) { return "leq" }
            else if (rel == LayoutRelation.Greater) { return "geq" }
            return "equ"
        }
        return {
            view1: this.firstItem !== undefined ? (this.firstItem as any).objectRef : undefined,
            attr1: toAttr(this.firstAttr),
            relation: toLayoutRelation(this.relation),
            view2: this.secondItem !== undefined ? (this.secondItem as any).objectRef : undefined,
            attr2: toAttr(this.secondAttr),
            multiplier: this.multiplier,
            constant: this.constant,
            priority: this.priority,
        }
    }

}