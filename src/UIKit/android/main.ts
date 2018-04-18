import { Context as IContext } from "../interface/Context";
import { Context as MContext } from "./Context";
export const Context = MContext;

import { ApplicationDelegate as IApplicationDelegate, Application as IApplication } from '../interface/Application'
import { ApplicationDelegate as MApplicationDelegate, Application as MApplication } from './Application'

export const ApplicationDelegate = MApplicationDelegate
export const Application = MApplication

import { Button as IButton } from '../interface/Button'
import { Button as MButton } from './Button'
export const Button = MButton

import { Color as IColor } from '../interface/Color'
export const Color = IColor

import { Font as IFont } from '../interface/Font';
import { Font as MFont } from './Font';
export const Font = MFont

import { ImageRenderingMode as IImageRenderingMode, Image as IImage, ContentMode as IContentMode, ImageView as IImageView } from '../interface/ImageView';
import { Image as MImage, ImageView as MImageView } from './ImageView';
export const ImageRenderingMode = IImageRenderingMode
export const Image = MImage
export const ContentMode = IContentMode
export const ImageView = MImageView

import { TextAlignment as ITextAlignment, TextVerticalAlignment as ITextVerticalAlignment, LineBreakMode as ILineBreakMode, Label as ILabel } from '../interface/Label'
import { Label as MLabel } from './Label'
export const TextAlignment = ITextAlignment
export const TextVerticalAlignment = ITextVerticalAlignment
export const LineBreakMode = ILineBreakMode
export const Label = MLabel

import { LayoutAttribute as ILayoutAttribute, LayoutRelation as ILayoutRelation, LayoutConstraint as ILayoutConstraint } from '../interface/LayoutConstraint'
import { LayoutConstraint as MLayoutConstraint } from './LayoutConstraint'
export const LayoutAttribute = ILayoutAttribute
export const LayoutRelation = ILayoutRelation
export const LayoutConstraint = MLayoutConstraint

import { RefreshControl as IRefreshControl } from "../interface/RefreshControl";
import { RefreshControl as MRefreshControl } from "./RefreshControl";
export const RefreshControl = MRefreshControl

import { LoadMoreControl as ILoadMoreControl } from "../interface/LoadMoreControl";
import { LoadMoreControl as MLoadMoreControl } from "./LoadMoreControl";
export const LoadMoreControl = MLoadMoreControl

import { ListSelectionStyle as IListSelectionStyle, ListCell as IListCell, ListView as IListView, ListEntity as IListEntity, ListSection as IListSection } from '../interface/ListView'
import { ListCell as MListCell, ListView as MListView, ListSection as MListSection } from './ListView'
export const ListSelectionStyle = IListSelectionStyle
export const ListEntity = IListEntity
export const ListCell = MListCell
export const ListView = MListView
export const ListSection = MListSection

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
export const InsetsMake = IInsetsMake

import { Screen as IScreen } from '../interface/Screen'
import { Screen as MScreen } from './Screen'
export const Screen = MScreen

import { ScrollView as IScrollView } from '../interface/ScrollView'
import { ScrollView as MScrollView } from './ScrollView'
export const ScrollView = MScrollView

import { TransformMatrix as ITransformMatrix } from '../interface/TransformMatrix';
export const TransformMatrix = ITransformMatrix

import { View as IView, InteractionState as IInteractionState, SwipeDirection as ISwipeDirection } from '../interface/View'
import { View as MView } from './View'
export const View = MView
export const InteractionState = IInteractionState
export const SwipeDirection = ISwipeDirection

import { Window as IWindow } from '../interface/Window'
import { Window as MWindow } from './Window'
export const Window = MWindow

import { ViewController as IViewController, KeyboardAvoidingMode as IKeyboardAvoidingMode, ViewControllerLayoutOptions as IViewControllerLayoutOptions } from '../interface/ViewController'
import { ViewController as MViewController, ViewControllerLayoutOptions as MViewControllerLayoutOptions } from './ViewController'
export const ViewController = MViewController
export const KeyboardAvoidingMode = IKeyboardAvoidingMode 
export const ViewControllerLayoutOptions = MViewControllerLayoutOptions

import { NavigationBar as INavigationBar, NavigationBarButtonItem as INavigationBarButtonItem } from '../interface/NavigationBar'
import { NavigationBar as MNavigationBar, NavigationBarButtonItem as MNavigationBarButtonItem } from './NavigationBar'
export const NavigationBar = MNavigationBar
export const NavigationBarButtonItem = MNavigationBarButtonItem

import { NavigationController as INavigationController } from '../interface/NavigationController'
import { NavigationController as MNavigationController } from './NavigationController'
export const NavigationController = MNavigationController

import { TextField as ITextField, TextFieldViewMode as ITextFieldViewMode, ReturnKeyType as IReturnKeyType, KeyboardType as IKeyboardType } from '../interface/TextField'
import { TextField as MTextField } from './TextField'
export const TextField = MTextField
export const TextFieldViewMode = ITextFieldViewMode
export const ReturnKeyType = IReturnKeyType
export const KeyboardType = IKeyboardType

import { TextView as ITextView } from '../interface/TextView'
import { TextView as MTextView } from './TextView'
export const TextView = MTextView

import { CanvasView as ICanvasView } from '../interface/CanvasView'
import { CanvasView as MCanvasView } from './CanvasView'
export const CanvasView = MCanvasView

import { Device as IDevice, DeviceOrientation as IDeviceOrientation } from '../interface/Device'
import { Device as MDevice } from './Device'
export const DeviceOrientation = IDeviceOrientation
export const Device = MDevice

import { TextMeasurer as ITextMeasurer } from '../interface/TextMeasurer';
import { TextMeasurer as MTextMeasurer } from './TextMeasurer'
export const TextMeasurer = MTextMeasurer

import { HRView as IHRView } from '../interface/HRView'
import { HRView as MHRView } from './HRView'
export const HRView = MHRView

import { Alert as IAlert, Confirm as IConfirm, Prompt as IPrompt } from '../interface/Modal'
import { Alert as MAlert, Confirm as MConfirm, Prompt as MPrompt } from './Modal'
export const Alert = MAlert
export const Confirm = MConfirm
export const Prompt = MPrompt

import { WebView as IWebView } from '../interface/WebView'
import { WebView as MWebView } from './WebView'
export const WebView = MWebView

import { Switch as ISwitch } from '../interface/Switch'
import { Switch as MSwitch } from './Switch'
export const Switch = MSwitch

import { Slider as ISlider } from '../interface/Slider'
import { Slider as MSlider } from './Slider'
export const Slider = MSlider

import { ActivityIndicatorViewStyle as IActivityIndicatorViewStyle, ActivityIndicatorView as IActivityIndicatorView } from '../interface/ActivityIndicatorView'
import { ActivityIndicatorView as MActivityIndicatorView } from './ActivityIndicatorView'
export const ActivityIndicatorViewStyle = IActivityIndicatorViewStyle
export const ActivityIndicatorView = MActivityIndicatorView

import { ExtView as IExtView } from "../interface/ExtView";
import { ExtView as MExtView } from "./ExtView";
export const ExtView = MExtView

import { CollectionViewScrollDirection as ICollectionViewScrollDirection, CollectionItem as ICollectionItem, CollectionSection as ICollectionSection, CollectionEntity as ICollectionEntity, CollectionCell as ICollectionCell, CollectionView as ICollectionView } from "../interface/CollectionView";
import { CollectionViewScrollDirection as MCollectionViewScrollDirection, CollectionCell as MCollectionCell, CollectionView as MCollectionView } from "./CollectionView";
export const CollectionEntity = ICollectionEntity
export const CollectionCell = MCollectionCell
export const CollectionView = MCollectionView
export const CollectionViewScrollDirection = MCollectionViewScrollDirection
export const CollectionSection = ICollectionSection

import { LayoutConstraintAxis as ILayoutConstraintAxis } from "../interface/LayoutConstraintAxis";
import { LayoutConstraintAxis as MLayoutConstraintAxis } from "./LayoutConstraintAxis";
export const LayoutConstraintAxis = MLayoutConstraintAxis

import { StackViewDistribution as IStackViewDistribution, StackViewAlignment as IStackViewAlignment, StackItem as IStackItem, StackView as IStackView } from "../interface/StackView";
import { StackViewDistribution as MStackViewDistribution, StackViewAlignment as MStackViewAlignment, StackItem as MStackItem, StackView as MStackView } from "./StackView";
export const StackItem = MStackItem
export const StackView = MStackView
export const StackViewDistribution = MStackViewDistribution
export const StackViewAlignment = MStackViewAlignment