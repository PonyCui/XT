/// <reference path="xtr.d.ts" />
import { View } from './View'

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

export class LayoutConstraint {

    static LayoutAttribute = LayoutAttribute;
    static LayoutRelation = LayoutRelation;

    nativeObject: any

    constructor(firstItem?: View, firstAttr?: LayoutAttribute, relation?: LayoutRelation, secondItem?: View, secondAttr?: LayoutAttribute, constant: number = 0, multiplier: number = 1, nativeObject?: any) {
        if (nativeObject !== undefined) {
            this.nativeObject = nativeObject;
        }
        else {
            this.nativeObject = XTRLayoutConstraint.createFirstAttrRelationSecondItemSecondAttrConstantMultiplierScriptObject(firstItem, firstAttr, relation, secondItem, secondAttr, constant, multiplier, this);
        }
    }

    public get firstItem(): View {
        return this.nativeObject.xtr_firstItem();
    }
    public get firstAttr(): LayoutAttribute {
        return this.nativeObject.xtr_firstAttr();
    }

    public get relation(): LayoutRelation {
        return this.nativeObject.xtr_relation();
    }

    public get secondItem(): View {
        return this.nativeObject.xtr_secondItem();
    }

    public get secondAttr(): LayoutAttribute {
        return this.nativeObject.xtr_secondAttr();
    }

    public get constant(): number {
        return this.nativeObject.xtr_constant();
    }

    public set constant(value: number) {
        this.nativeObject.xtr_setConstant(value);
    }

    public get multiplier(): number {
        return this.nativeObject.xtr_multiplier();
    }

    public get priority(): number {
        return this.nativeObject.xtr_priority();
    }

    public set priority(value: number) {
        this.nativeObject.xtr_setPriority(value);
    }

    static constraintsWithVisualFormat(format: string, views: { [key: string]: View }): LayoutConstraint[] {
        return XTRLayoutConstraint.xtr_constraintsWithVisualFormatViews(format, views);
    }

}

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.constructor.toString() === "[object XTRLayoutConstraintConstructor]") {
        return new LayoutConstraint(undefined, undefined, undefined, undefined, undefined, undefined, undefined, view);
    }
    return undefined;
})