import { ApplicationDelegate as IApplicationDelegate, Application as IApplication } from './interface/Application'
import { Application as MApplication } from './implementation/pixi/Application'

export class ApplicationDelegate extends IApplicationDelegate {}
export class Application extends MApplication {}

import { Button as IButton } from './interface/Button'
import { Button as MButton } from './implementation/pixi/Button'
export class Button extends MButton {}

import { Color as IColor } from './interface/Color'
export class Color extends IColor {}

import { Font as IFont } from './interface/Font';
export class Font extends IFont {}

import { ImageRenderingMode as IImageRenderingMode, Image as IImage, ContentMode as IContentMode, ImageView as IImageView } from "./interface/ImageView";
import { Image as MImage, ImageView as MImageView } from "./implementation/pixi/ImageView";
export const ImageRenderingMode = IImageRenderingMode
export class Image extends MImage {}
export const ContentMode = IContentMode
export class ImageView extends MImageView {}

import { TextAlignment as ITextAlignment, TextVerticalAlignment as ITextVerticalAlignment, LineBreakMode as ILineBreakMode, Label as ILabel } from './interface/Label'
import { Label as MLabel } from './implementation/pixi/Label'
export const TextAlignment = ITextAlignment
export const TextVerticalAlignment = ITextVerticalAlignment
export const LineBreakMode = ILineBreakMode
export class Label extends MLabel {}

import { LayoutAttribute as ILayoutAttribute, LayoutRelation as ILayoutRelation, LayoutConstraint as ILayoutConstraint } from './interface/LayoutConstraint'
import { LayoutConstraint as MLayoutConstraint } from './implementation/pixi/LayoutConstraint'
export const LayoutAttribute = ILayoutAttribute
export const LayoutRelation = ILayoutRelation
export class LayoutConstraint extends MLayoutConstraint {}

import { ListSelectionStyle as IListSelectionStyle, ListCell as IListCell, ListView as IListView } from './interface/ListView'
import { ListCell as MListCell, ListView as MListView } from './implementation/pixi/ListView'
export const ListSelectionStyle = IListSelectionStyle
export class ListCell extends MListCell {}
export class ListView extends MListView {}

import { PointMake as IPointMake, PointEqual as IPointEqual, PointZero as IPointZero, SizeMake as ISizeMake, SizeEqual as ISizeEqual, SizeZero as ISizeZero, RectMake as IRectMake, RectZero as IRectZero, RectEqual as IRectEqual, RectInside as IRectInside, InsetsMake as IInsetsMake } from './interface/Rect'
export const PointMake = IPointMake
export const PointEqual = IPointEqual
export const PointZero = IPointZero
export const SizeMake = ISizeMake
export const SizeEqual = ISizeEqual
export const SizeZero = ISizeZero
export const RectMake = IRectMake
export const RectZero = IRectZero
export const RectEqual = IRectEqual
export const RectInside = IRectInside

import { Screen as IScreen } from './interface/Screen'
export class Screen extends IScreen {}

import { ScrollView as IScrollView } from './interface/ScrollView'
import { ScrollView as MScrollView } from './implementation/pixi/ScrollView'
export class ScrollView extends MScrollView {}

import { TransformMatrix as ITransformMatrix } from './interface/TransformMatrix';
export class TransformMatrix extends ITransformMatrix {}

import { View as IView, InteractionState as IInteractionState, SwipeDirection as ISwipeDirection } from './interface/View'
import { View as MView } from './implementation/pixi/View'
export class View extends MView {}
export const InteractionState = IInteractionState
export const SwipeDirection = ISwipeDirection

import { Window as IWindow } from './interface/Window'
import { Window as MWindow } from './implementation/pixi/Window'
export class Window extends MWindow {}

import { ViewController as IViewController } from './interface/ViewController'
import { ViewController as MViewController } from './implementation/pixi/ViewController'
export class ViewController extends MViewController {}

import { NavigationController as INavigationController } from './interface/NavigationController'
import { NavigationController as MNavigationController } from './implementation/pixi/NavigationController'
export class NavigationController extends MNavigationController {}

import { CanvasView as ICanvasView } from './interface/CanvasView'
import { CanvasView as MCanvasView } from './implementation/pixi/CanvasView'
export class CanvasView extends MCanvasView { }

import { CustomView as ICustomView } from './interface/CustomView'
import { CustomView as MCustomView } from './implementation/pixi/CustomView'
export class CustomView extends MCustomView { }