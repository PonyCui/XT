declare function require(name: string): any;
import { UIView } from './UIView'

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

    static constraintsWithVisualFormat(format: string, views: { [key: string]: UIView }): NSLayoutConstraint[] { return []; }

}