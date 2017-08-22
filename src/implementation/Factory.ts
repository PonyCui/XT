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
    static Label: typeof I.Label = I.Label;
    static TextAlignment = I.TextAlignment;
    static TextVerticalAlignment = I.TextVerticalAlignment;
    static LineBreakMode = I.LineBreakMode;
    static Font: typeof I.Font = I.Font;
    static View: typeof I.View = I.View;
    static Application: typeof I.Application = I.Application;
    static ApplicationDelegate: typeof I.ApplicationDelegate = I.ApplicationDelegate;
    static Window: typeof I.Window = I.Window;
    static Color: typeof I.Color = I.Color;
    static Screen: typeof I.Screen = I.Screen;
    static TransformMatrix: typeof I.TransformMatrix = I.TransformMatrix;
    static LayoutConstraint: typeof I.LayoutConstraint = I.LayoutConstraint;
    static Button: typeof I.Button = I.Button;
    static ImageView: typeof I.ImageView = I.ImageView;
    static Image: typeof I.Image = I.Image;
    static ContentMode = I.ContentMode;
    static RenderingMode = I.RenderingMode;

}

export function SwitchFactory() {
    
}