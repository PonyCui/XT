import { ApplicationDelegate as IApplicationDelegate, Application as IApplication } from './interface/Application'

export const ApplicationDelegate = IApplicationDelegate
export const Application = IApplication

import { Button as IButton } from './interface/Button'
export const Button = IButton

import { Color as IColor } from './interface/Color'
export const Color = IColor

import { Font as IFont } from './interface/Font';
export const Font = IFont

import { ImageRenderingMode as IImageRenderingMode, Image as IImage, ContentMode as IContentMode, ImageView as IImageView } from "./interface/ImageView";
export const ImageRenderingMode = IImageRenderingMode
export const Image = IImage
export const ContentMode = IContentMode
export const ImageView = IImageView

import { TextAlignment as ITextAlignment, TextVerticalAlignment as ITextVerticalAlignment, LineBreakMode as ILineBreakMode, Label as ILabel } from './interface/Label'
export const TextAlignment = ITextAlignment
export const TextVerticalAlignment = ITextVerticalAlignment
export const LineBreakMode = ILineBreakMode
export const Label = ILabel

import { LayoutAttribute as ILayoutAttribute, LayoutRelation as ILayoutRelation, LayoutConstraint as ILayoutConstraint } from './interface/LayoutConstraint'
export const LayoutAttribute = ILayoutAttribute
export const LayoutRelation = ILayoutRelation
export const LayoutConstraint = ILayoutConstraint

import { ListSelectionStyle as IListSelectionStyle, ListCell as IListCell, ListView as IListView } from './interface/ListView'
export const ListSelectionStyle = IListSelectionStyle
export const ListCell = IListCell
export const ListView = IListView

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
export const ScrollView = IScrollView

import { TransformMatrix as ITransformMatrix } from './interface/TransformMatrix';
export const TransformMatrix = ITransformMatrix

import { View as IView, InteractionState as IInteractionState, SwipeDirection as ISwipeDirection } from './interface/View'
export const View = IView
export const InteractionState = IInteractionState
export const SwipeDirection = ISwipeDirection

import { Window as IWindow } from './interface/Window'
export const Window = IWindow

import { ViewController as IViewController } from './interface/ViewController'
export const ViewController = IViewController