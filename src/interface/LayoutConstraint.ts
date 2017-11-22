declare function require(name: string): any;
import { View } from './View'
import { Releasable } from './Releasable';

export enum LayoutAttribute {
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

export enum LayoutRelation {
    Less = -1,
    Equal = 0,
    Greater = 1,
}

export class LayoutConstraint implements Releasable {
    
    addOwner(owner: any): this {
        return this
    }

    readonly firstItem?: View;
    readonly firstAttr?: LayoutAttribute;
    readonly relation: LayoutRelation = LayoutRelation.Equal;
    readonly secondItem?: View;
    readonly secondAttr?: LayoutAttribute;
    constant: number = 0;
    readonly multiplier: number = 1;
    priority: number = 750;

    constructor(firstItem?: View, firstAttr?: LayoutAttribute, relation?: LayoutRelation, secondItem?: View, secondAttr?: LayoutAttribute, constant: number = 0, multiplier: number = 1) {
        this.firstItem = firstItem
        this.firstAttr = firstAttr
        this.relation = relation || LayoutRelation.Equal
        this.secondItem = secondItem
        this.secondAttr = secondAttr
        this.constant = constant
        this.multiplier = multiplier
    }

    static constraintsWithVisualFormat(format: string, views: { [key: string]: View }): LayoutConstraint[] { return []; }

}