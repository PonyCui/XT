import { ApplicationDelegate as IApplicationDelegate, Application as IApplication } from './interface/Application'
import { ApplicationDelegate as MApplicationDelegate, Application as MApplication } from './implementation/web/Application'

export class ApplicationDelegate extends MApplicationDelegate { }
export class Application extends MApplication { }

import { Color as IColor } from './interface/Color'
export class Color extends IColor { }

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

import { View as IView, InteractionState as IInteractionState, SwipeDirection as ISwipeDirection } from './interface/View'
import { View as MView } from './implementation/web/View'
export class View extends MView { }
export const InteractionState = IInteractionState
export const SwipeDirection = ISwipeDirection

import { Window as IWindow } from './interface/Window'
import { Window as MWindow } from './implementation/web/Window'
export class Window extends MWindow { }

declare var module: any;
(window as any).XT = module.exports;