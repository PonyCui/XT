import { ApplicationDelegate as IApplicationDelegate, Application as IApplication } from './interface/Application'

export class ApplicationDelegate extends IApplicationDelegate { }
export class Application extends IApplication { }

import { Button as IButton } from './interface/Button'
export class Button extends IButton { }

import { Color as IColor } from './interface/Color'
export class Color extends IColor { }

import { Font as IFont } from './interface/Font';
export class Font extends IFont { }

import { ImageRenderingMode as IImageRenderingMode, Image as IImage, ContentMode as IContentMode, ImageView as IImageView } from "./interface/ImageView";
export const ImageRenderingMode = IImageRenderingMode
export class Image extends IImage { }
export const ContentMode = IContentMode
export class ImageView extends IImageView { }

import { TextAlignment as ITextAlignment, TextVerticalAlignment as ITextVerticalAlignment, LineBreakMode as ILineBreakMode, Label as ILabel } from './interface/Label'
export const TextAlignment = ITextAlignment
export const TextVerticalAlignment = ITextVerticalAlignment
export const LineBreakMode = ILineBreakMode
export class Label extends ILabel { }

import { LayoutAttribute as ILayoutAttribute, LayoutRelation as ILayoutRelation, LayoutConstraint as ILayoutConstraint } from './interface/LayoutConstraint'
export const LayoutAttribute = ILayoutAttribute
export const LayoutRelation = ILayoutRelation
export class LayoutConstraint extends ILayoutConstraint { }

import { ListSelectionStyle as IListSelectionStyle, ListCell as IListCell, ListView as IListView } from './interface/ListView'
export const ListSelectionStyle = IListSelectionStyle
export class ListCell extends IListCell { }
export class ListView extends IListView { }

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
export class Screen extends IScreen { }

import { ScrollView as IScrollView } from './interface/ScrollView'
export class ScrollView extends IScrollView { }

import { TransformMatrix as ITransformMatrix } from './interface/TransformMatrix';
export class TransformMatrix extends ITransformMatrix { }

import { View as IView, InteractionState as IInteractionState, SwipeDirection as ISwipeDirection } from './interface/View'
export class View extends IView { }
export const InteractionState = IInteractionState
export const SwipeDirection = ISwipeDirection

import { Window as IWindow } from './interface/Window'
export class Window extends IWindow { }

import { ViewController as IViewController } from './interface/ViewController'
export class ViewController extends IViewController { }

import { NavigationController as INavigationController } from './interface/NavigationController'
export class NavigationController extends INavigationController { }

import { TextField as ITextField, TextFieldViewMode as ITextFieldViewMode, ReturnKeyType as IReturnKeyType, KeyboardType as IKeyboardType } from './interface/TextField'
export class TextField extends ITextField { }
export const TextFieldViewMode = ITextFieldViewMode
export const ReturnKeyType = IReturnKeyType
export const KeyboardType = IKeyboardType

import { TextView as ITextView } from './interface/TextView'
export class TextView extends ITextView { }

import { CanvasView as ICanvasView } from './interface/CanvasView'
export class CanvasView extends ICanvasView { }

import { CustomView as ICustomView } from './interface/CustomView'
export class CustomView extends ICustomView { }

import { Device as IDevice, DeviceOrientation as IDeviceOrientation } from './interface/Device'
export const DeviceOrientation = IDeviceOrientation
export class Device extends IDevice { }

import { TextMeasurer as ITextMeasurer } from './interface/TextMeasurer';
export class TextMeasurer extends ITextMeasurer { }

import { HRView as IHRView } from './interface/HRView'
export class HRView extends IHRView { }

import { Alert as IAlert, Confirm as IConfirm, Prompt as IPrompt } from './interface/Modal'
export class Alert extends IAlert { }
export class Confirm extends IConfirm { }
export class Prompt extends IPrompt { }

import { WebView as IWebView } from './interface/WebView'
export class WebView extends IWebView { }