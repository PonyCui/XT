import { ApplicationDelegate as IApplicationDelegate, Application as IApplication } from './interface/Application'
import { Application as MApplication } from './implementation/pixi/Application'

export const ApplicationDelegate = IApplicationDelegate
export const Application: typeof IApplication = MApplication as any

import { Button as IButton } from './interface/Button'
import { Button as MButton } from './implementation/pixi/Button'
export const Button: typeof IButton = MButton as any

import { Color as IColor } from './interface/Color'
export const Color = IColor

import { Font as IFont } from './interface/Font';
export const Font = IFont

import { ImageRenderingMode as IImageRenderingMode, Image as IImage, ContentMode as IContentMode, ImageView as IImageView } from "./interface/ImageView";
import { Image as MImage, ImageView as MImageView } from "./implementation/pixi/ImageView";
export const ImageRenderingMode = IImageRenderingMode
export const Image: typeof IImage = MImage as any
export const ContentMode = IContentMode
export const ImageView: typeof IImageView = MImageView as any

import { TextAlignment as ITextAlignment, TextVerticalAlignment as ITextVerticalAlignment, LineBreakMode as ILineBreakMode, Label as ILabel } from './interface/Label'
import { Label as MLabel } from './implementation/pixi/Label'
export const TextAlignment = ITextAlignment
export const TextVerticalAlignment = ITextVerticalAlignment
export const LineBreakMode = ILineBreakMode
export const Label: typeof ILabel = MLabel as any

import { LayoutAttribute as ILayoutAttribute, LayoutRelation as ILayoutRelation, LayoutConstraint as ILayoutConstraint } from './interface/LayoutConstraint'
import { LayoutConstraint as MLayoutConstraint } from './implementation/pixi/LayoutConstraint'
export const LayoutAttribute = ILayoutAttribute
export const LayoutRelation = ILayoutRelation
export const LayoutConstraint: typeof ILayoutConstraint = MLayoutConstraint as any

import { ListSelectionStyle as IListSelectionStyle, ListCell as IListCell, ListView as IListView } from './interface/ListView'
import { ListCell as MListCell, ListView as MListView } from './implementation/pixi/ListView'
export const ListSelectionStyle = IListSelectionStyle
export const ListCell: typeof IListCell = MListCell as any
export const ListView: typeof IListView = MListView as any

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
export const Screen = IScreen

import { ScrollView as IScrollView } from './interface/ScrollView'
import { ScrollView as MScrollView } from './implementation/pixi/ScrollView'
export const ScrollView: typeof IScrollView = MScrollView as any

import { TransformMatrix as ITransformMatrix } from './interface/TransformMatrix';
export const TransformMatrix = ITransformMatrix

import { View as IView, InteractionState as IInteractionState, SwipeDirection as ISwipeDirection } from './interface/View'
import { View as MView } from './implementation/pixi/View'
export const View: typeof IView = MView as any
export const InteractionState = IInteractionState
export const SwipeDirection = ISwipeDirection

import { Window as IWindow } from './interface/Window'
import { Window as MWindow } from './implementation/pixi/Window'
export const Window: typeof IWindow = MWindow as any

import { ViewController as IViewController } from './interface/ViewController'
import { ViewController as MViewController } from './implementation/pixi/ViewController'
export const ViewController: typeof IViewController = MViewController as any

import { NavigationController as INavigationController } from './interface/NavigationController'
import { NavigationController as MNavigationController } from './implementation/pixi/NavigationController'
export const NavigationController: typeof INavigationController = MNavigationController as any