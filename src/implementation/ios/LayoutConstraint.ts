/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Releasable } from '../../interface/Releasable';

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

    retain(): this {
        XTMemoryManager_Retain(this.objectRef)
        return this
    }

    release(): this {
        XTMemoryManager_Release(this.objectRef)
        return this
    }

    static LayoutAttribute = LayoutAttribute;
    static LayoutRelation = LayoutRelation;

    objectRef: any;

    constructor(firstItem?: View | string, firstAttr?: LayoutAttribute, relation?: LayoutRelation, secondItem?: View, secondAttr?: LayoutAttribute, constant: number = 0, multiplier: number = 1) {
        if (typeof firstItem === "string") {
            if (objectRefs[firstItem]) {
                return objectRefs[firstItem]
            }
            this.objectRef = firstItem
        }
        else {
            this.objectRef = XTRLayoutConstraint.createFirstAttrRelationSecondItemSecondAttrConstantMultiplierScriptObject(firstItem, firstAttr, relation, secondItem, secondAttr, constant, multiplier, this);
        }
        objectRefs[this.objectRef] = this;
    }

    public get firstItem(): View | undefined {
        const ref = XTRLayoutConstraint.xtr_firstItem(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new View(ref);
    }
    public get firstAttr(): LayoutAttribute {
        return XTRLayoutConstraint.xtr_firstAttr(this.objectRef);
    }

    public get relation(): LayoutRelation {
        return XTRLayoutConstraint.xtr_relation(this.objectRef);
    }

    public get secondItem(): View | undefined {
        const ref = XTRLayoutConstraint.xtr_secondItem(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new View(ref);
    }

    public get secondAttr(): LayoutAttribute {
        return XTRLayoutConstraint.xtr_secondAttr(this.objectRef);
    }

    public get constant(): number {
        return XTRLayoutConstraint.xtr_constant(this.objectRef);
    }

    public set constant(value: number) {
        XTRLayoutConstraint.xtr_setConstantObjectRef(value, this.objectRef);
    }

    public get multiplier(): number {
        return XTRLayoutConstraint.xtr_multiplier(this.objectRef);
    }

    public get priority(): number {
        return XTRLayoutConstraint.xtr_priority(this.objectRef);
    }

    public set priority(value: number) {
        XTRLayoutConstraint.xtr_setPriorityObjectRef(value, this.objectRef);
    }

    static constraintsWithVisualFormat(format: string, views: { [key: string]: View }): LayoutConstraint[] {
        return XTRLayoutConstraint.xtr_constraintsWithVisualFormatViews(format, views).map((ref: string) => {
            return new LayoutConstraint(ref)
        });
    }

}