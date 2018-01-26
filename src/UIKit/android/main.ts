import { ApplicationDelegate as IApplicationDelegate, Application as IApplication } from '../interface/Application'
import { ApplicationDelegate as MApplicationDelegate, Application as MApplication } from './Application'

export class ApplicationDelegate extends MApplicationDelegate {}
export class Application extends MApplication {}

import { Button as IButton } from '../interface/Button'
import { Button as MButton } from './Button'
export class Button extends MButton {}

import { Color as IColor } from '../interface/Color'
export class Color extends IColor {}

import { Font as IFont } from '../interface/Font';
import { Font as MFont } from './Font';
export class Font extends MFont {}

import { ImageRenderingMode as IImageRenderingMode, Image as IImage, ContentMode as IContentMode, ImageView as IImageView } from '../interface/ImageView';
import { Image as MImage, ImageView as MImageView } from './ImageView';
export const ImageRenderingMode = IImageRenderingMode
export class Image extends MImage {}
export const ContentMode = IContentMode
export class ImageView extends MImageView {}

import { TextAlignment as ITextAlignment, TextVerticalAlignment as ITextVerticalAlignment, LineBreakMode as ILineBreakMode, Label as ILabel } from '../interface/Label'
import { Label as MLabel } from './Label'
export const TextAlignment = ITextAlignment
export const TextVerticalAlignment = ITextVerticalAlignment
export const LineBreakMode = ILineBreakMode
export class Label extends MLabel {}

import { LayoutAttribute as ILayoutAttribute, LayoutRelation as ILayoutRelation, LayoutConstraint as ILayoutConstraint } from '../interface/LayoutConstraint'
import { LayoutConstraint as MLayoutConstraint } from './LayoutConstraint'
export const LayoutAttribute = ILayoutAttribute
export const LayoutRelation = ILayoutRelation
export class LayoutConstraint extends MLayoutConstraint {}

import { ListSelectionStyle as IListSelectionStyle, ListCell as IListCell, ListView as IListView } from '../interface/ListView'
import { ListCell as MListCell, ListView as MListView } from './ListView'
export const ListSelectionStyle = IListSelectionStyle
export class ListCell extends MListCell {}
export class ListView extends MListView {}

import { PointMake as IPointMake, PointEqual as IPointEqual, PointZero as IPointZero, SizeMake as ISizeMake, SizeEqual as ISizeEqual, SizeZero as ISizeZero, RectMake as IRectMake, RectZero as IRectZero, RectEqual as IRectEqual, RectInside as IRectInside, InsetsMake as IInsetsMake } from '../interface/Rect'
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

import { Screen as IScreen } from '../interface/Screen'
import { Screen as MScreen } from './Screen'
export class Screen extends MScreen {}

import { ScrollView as IScrollView } from '../interface/ScrollView'
import { ScrollView as MScrollView } from './ScrollView'
export class ScrollView extends MScrollView {}

import { TransformMatrix as ITransformMatrix } from '../interface/TransformMatrix';
export class TransformMatrix extends ITransformMatrix {}

import { View as IView, InteractionState as IInteractionState, SwipeDirection as ISwipeDirection } from '../interface/View'
import { View as MView } from './View'
export class View extends MView {}
export const InteractionState = IInteractionState
export const SwipeDirection = ISwipeDirection

import { Window as IWindow } from '../interface/Window'
import { Window as MWindow } from './Window'
export class Window extends MWindow {}

import { ViewController as IViewController, KeyboardAvoidingMode as IKeyboardAvoidingMode } from '../interface/ViewController'
import { ViewController as MViewController } from './ViewController'
export class ViewController extends MViewController {}
export const KeyboardAvoidingMode = IKeyboardAvoidingMode 

import { NavigationBar as INavigationBar, NavigationBarButtonItem as INavigationBarButtonItem } from '../interface/NavigationBar'
import { NavigationBar as MNavigationBar, NavigationBarButtonItem as MNavigationBarButtonItem } from './NavigationBar'
export class NavigationBar extends MNavigationBar { }
export class NavigationBarButtonItem extends MNavigationBarButtonItem { }

import { NavigationController as INavigationController } from '../interface/NavigationController'
import { NavigationController as MNavigationController } from './NavigationController'
export class NavigationController extends MNavigationController {}

import { TextField as ITextField, TextFieldViewMode as ITextFieldViewMode, ReturnKeyType as IReturnKeyType, KeyboardType as IKeyboardType } from '../interface/TextField'
import { TextField as MTextField } from './TextField'
export class TextField extends MTextField {}
export const TextFieldViewMode = ITextFieldViewMode
export const ReturnKeyType = IReturnKeyType
export const KeyboardType = IKeyboardType

import { TextView as ITextView } from '../interface/TextView'
import { TextView as MTextView } from './TextView'
export class TextView extends MTextView { }

import { CanvasView as ICanvasView } from '../interface/CanvasView'
import { CanvasView as MCanvasView } from './CanvasView'
export class CanvasView extends MCanvasView { }

import { CustomView as ICustomView } from '../interface/CustomView'
import { CustomView as MCustomView } from './CustomView'
export class CustomView extends MCustomView { }

import { Device as IDevice, DeviceOrientation as IDeviceOrientation } from '../interface/Device'
import { Device as MDevice } from './Device'
export const DeviceOrientation = IDeviceOrientation
export class Device extends MDevice { }

import { TextMeasurer as ITextMeasurer } from '../interface/TextMeasurer';
import { TextMeasurer as MTextMeasurer } from './TextMeasurer'
export class TextMeasurer extends MTextMeasurer { }

import { HRView as IHRView } from '../interface/HRView'
import { HRView as MHRView } from './HRView'
export class HRView extends MHRView { }

import { Alert as IAlert, Confirm as IConfirm, Prompt as IPrompt } from '../interface/Modal'
import { Alert as MAlert, Confirm as MConfirm, Prompt as MPrompt } from './Modal'
export class Alert extends MAlert { }
export class Confirm extends MConfirm { }
export class Prompt extends MPrompt { }

import { WebView as IWebView } from '../interface/WebView'
import { WebView as MWebView } from './WebView'
export class WebView extends MWebView { }

import { Switch as ISwitch } from '../interface/Switch'
import { Switch as MSwitch } from './Switch'
export class Switch extends MSwitch { }

import { Slider as ISlider } from '../interface/Slider'
import { Slider as MSlider } from './Slider'
export class Slider extends MSlider { }

import { ActivityIndicatorViewStyle as IActivityIndicatorViewStyle, ActivityIndicatorView as IActivityIndicatorView } from '../interface/ActivityIndicatorView'
import { ActivityIndicatorView as MActivityIndicatorView } from './ActivityIndicatorView'
export const ActivityIndicatorViewStyle = IActivityIndicatorViewStyle
export class ActivityIndicatorView extends MActivityIndicatorView { }

declare var module: any;
declare var XT: any;
if (typeof XT === 'object') {
    XT = module.exports
}