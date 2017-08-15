declare function require(name: string): any;
import { UIView } from './UIView'
const AutoLayout = require("autolayout");

export enum Attribute {
    Const = 0,
    Left = 1,
    Right = 2,
    Top = 3,
    Bottom = 4,
    Width = 7,
    Height = 8,
    CenterX = 9,
    CenterY = 10,
}

export enum Relation {
    Less = -1,
    Equal = 0,
    Greater = 1,
}

export class NSLayoutConstraint {

    static Attribute = Attribute;
    static Relation = Relation;

    readonly firstItem?: UIView;
    readonly firstAttr?: Attribute;
    readonly relation: Relation = Relation.Equal;
    readonly secondItem?: UIView;
    readonly secondAttr?: Attribute;
    constant: number = 0;
    readonly multiplier: number = 1;
    priority: number = 750;

    constructor(firstItem?: UIView, firstAttr?: Attribute, relation?: Relation, secondItem?: UIView, secondAttr?: Attribute, constant: number = 0, multiplier: number = 1) {
        this.firstItem = firstItem
        this.firstAttr = firstAttr
        this.relation = relation || Relation.Equal
        this.secondItem = secondItem
        this.secondAttr = secondAttr
        this.constant = constant
        this.multiplier = multiplier
    }

    private static fromALObject(obj: any, views: { [key: string]: UIView }): NSLayoutConstraint {
        const toAttr = (attr: string): Attribute | undefined => {
            if (attr == "const") { return Attribute.Const }
            if (attr == "left") { return Attribute.Left }
            if (attr == "right") { return Attribute.Right }
            if (attr == "top") { return Attribute.Top }
            if (attr == "bottom") { return Attribute.Bottom }
            if (attr == "width") { return Attribute.Width }
            if (attr == "height") { return Attribute.Height }
            if (attr == "centerX") { return Attribute.CenterX }
            if (attr == "centerY") { return Attribute.CenterY }
        }
        const toRelation = (rel: string): Relation => {
            if (rel == "leq") { return Relation.Less }
            if (rel == "geq") { return Relation.Greater }
            return Relation.Equal;
        }
        const constant = obj.constant == "default" ? 8 : parseInt(obj.constant);
        const layoutConstraint = new NSLayoutConstraint(views[obj.view1], toAttr(obj.attr1), toRelation(obj.relation), views[obj.view2], toAttr(obj.attr2), constant, obj.multiplier);
        layoutConstraint.priority = obj.priority || 750
        return layoutConstraint;
    }

    static constraintsWithVisualFormat(format: string, views: { [key: string]: UIView }): NSLayoutConstraint[] {
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
        const toAttr = (attr?: Attribute): string | undefined => {
            if (attr == Attribute.Const) { return "const" }
            if (attr == Attribute.Left) { return "left" }
            if (attr == Attribute.Right) { return "right" }
            if (attr == Attribute.Top) { return "top" }
            if (attr == Attribute.Bottom) { return "bottom" }
            if (attr == Attribute.Width) { return "width" }
            if (attr == Attribute.Height) { return "height" }
            if (attr == Attribute.CenterX) { return "centerX" }
            if (attr == Attribute.CenterY) { return "centerY" }
            return undefined;
        }
        const toRelation = (rel: Relation): string => {
            if (rel == Relation.Equal) { return "equ" }
            else if (rel == Relation.Less) { return "leq" }
            else if (rel == Relation.Greater) { return "geq" }
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