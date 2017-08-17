import { usePixi } from './pixi/index'
import * as I from '../interface/Abstract'

export class Factory {

    static PointMake = I.PointMake
    static PointEqual = I.PointEqual
    static PointZero = I.PointZero
    static RectMake = I.RectMake;
    static RectZero = I.RectZero;
    static RectEqual = I.RectEqual;
    static RectInside = I.RectInside;
    static SizeMake = I.SizeMake;
    static SizeZero = I.SizeZero;
    static SizeEqual = I.SizeEqual;
    static Label = I.Label;
    static TextAlignment = I.TextAlignment;
    static TextVerticalAlignment = I.TextVerticalAlignment;
    static LineBreakMode = I.LineBreakMode;
    static Font = I.Font;
    static View: typeof I.View = I.View;
    static Application: typeof I.Application = I.Application;
    static ApplicationDelegate: typeof I.ApplicationDelegate = I.ApplicationDelegate;
    static Window: typeof I.Window = I.Window;
    static Color = I.Color;
    static Screen = I.Screen;
    static TransformMatrix = I.TransformMatrix;
    static LayoutConstraint = I.LayoutConstraint;

}

export function SwitchFactory() {
    usePixi();
}