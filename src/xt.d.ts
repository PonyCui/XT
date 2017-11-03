// declare const XTRDebugger: any
// declare const XTRBreakpoint: any

export as namespace XT;

export enum InteractionState {
    Began,
    Changed,
    Ended,
    Cancelled,
}

export enum SwipeDirection {
    ToLeft,
    ToRight,
    ToTop,
    ToBottom,
}

export class View {

    constructor(rect?: Rect)
    init(): void

    // Mark: View Geometry
    /**
     * use frame to describe view origin and size.
     */
    frame: Rect;
    /**
     * use bounds to describe content's size.
     */
    bounds: Rect;
    /**
     * convenience method, reset view center, will convert to frame.
     */
    center: Point;
    /**
     * use transform to describe content's transforming
     */
    transform?: TransformMatrix;
    // Mark: View Rendering
    /**
     * defaults to false, if true, contents will not render out of bounds.
     */
    clipsToBounds: boolean;
    /**
     * defaults to undefined,.
     */
    backgroundColor?: Color;
    /**
     * defaults to 1.0.
     */
    alpha: number;
    /**
     * defaults to false, if true, the views below this view, will not render.
     */
    opaque: boolean;
    /**
     * defaults to false, if true, view will not render.
     */
    hidden: boolean;
    /**
     * defaults to ContentMode.ScaleToFill
     */
    contentMode?: ContentMode;
    /**
     * defaults to undefined, valid to maskView !== undefined and set clipsToBounds = true.
     */
    maskView?: View
    /**
     * defaults to gray blue color.
     */
    tintColor: Color
    /**
     * method will call after tintColor changed, superview tintColor change cause call either.
     */
    tintColorDidChange(): void
    // Mark: View Layer-Back Rendering
    /**
     * defaults to 0.
     */
    cornerRadius: number;
    /**
     * defaults to 0.
     */
    borderWidth: number;
    /**
     * defaults to undefined.
     */
    borderColor?: Color;
    /**
     * defaults to undefined.
     */
    shadowColor?: Color;
    /**
     * defaults to 0;
     */
    shadowOpacity: number;
    /**
     * defaults to {width:0, height: -3};
     */
    shadowOffset?: Size;
    /**
     * defaults to 3;
     */
    shadowRadius: number;
    // Mark: View Hierarchy
    /**
     * add tag to view, view could be found with View.viewWithTag(number).
     */
    tag?: number;
    /**
     * returns superview.
     */
    superview?: View
    /**
     * returns this subviews.
     */
    subviews: View[]
    /**
     * returns this view attached window.
     */
    window?: Window
    /**
     * remove self from superview.
     */
    removeFromSuperview(): void
    /**
     * insert a view at specific index
     * @param subview subview
     * @param atIndex index (crash if out of bounds)
     */
    insertSubviewAtIndex(subview: View, atIndex: number): void
    /**
     * exchange two view z-index.
     */
    exchangeSubviewAtIndex(index1: number, index2: number): void
    /**
     * add subview to front.
     * @param subview 
     */
    addSubview(subview: View): void
    /**
     * insert subview below a view.
     * @param subview subview
     * @param siblingSubview below this view.
     */
    insertSubviewBelow(subview: View, siblingSubview: View): void
    /**
     * insert subview above a view.
     * @param subview subview
     * @param siblingSubview above this view.
     */
    insertSubviewAbove(subview: View, siblingSubview: View): void
    /**
     * bring subview to front.
     * @param subview subview.
     */
    bringSubviewToFront(subview: View): void
    /**
     * send subview to back.
     * @param subview subview.
     */
    sendSubviewToBack(subview: View): void
    /**
     * call after a subview has been add to self.
     * @param subview subview
     */
    didAddSubview(subview: View): void
    /**
     * call before a subview will be removed from self.
     * @param subview subview
     */
    willRemoveSubview(subview: View): void
    /**
     * call before move to new superview for self.
     * @param newSuperview new superview
     */
    willMoveToSuperview(newSuperview?: View): void
    /**
     * call after move to new superview for self.
     */
    didMoveToSuperview(): void
    /**
     * call before move to window for self.
     * @param newWindow window
     */
    willMoveToWindow(newWindow?: Window): void
    /**
     * call after move to window for self.
     */
    didMoveToWindow(): void
    /**
     * check a view is a child or grand-x-child as the view.
     * @param subview the view
     */
    isDescendantOfView(view: View): boolean
    /**
     * recursive search. includes self
     * @param tag tag
     */
    viewWithTag(tag: number): View | undefined
    /**
     * Allows you to perform layout before the drawing cycle happens. -layoutIfNeeded forces layout early
     */
    setNeedsLayout(): void
    /**
     * call layoutSubviews immediately
     */
    layoutIfNeeded(): void
    /**
     * override point. called by layoutIfNeeded automatically.
     */
    layoutSubviews(): void
    setNeedsDisplay(): void
    // Mark: View LayoutConstraint
    constraints: LayoutConstraint[]
    addConstraint(constraint: LayoutConstraint): void
    addConstraints(constraints: LayoutConstraint[]): void
    removeConstraint(constraint: LayoutConstraint): void
    removeAllConstraints(): void
    // Mark: View Interactive
    static InteractionState: InteractionState
    static SwipeDirection: SwipeDirection
    userInteractionEnabled: boolean;
    multipleTouchEnabled: boolean;
    longPressDuration: number;
    onTap?: () => void
    onDoubleTap?: () => void
    onLongPress?: (state: InteractionState, viewLocation?: Point, absLocation?: Point) => void
    onPan?: (state: InteractionState, viewLocation?: Point, absLocation?: Point) => void
    // Mark: View Animation
    static animationWithDuration(duration: number, animations: () => void, completion?: () => void): void
    static animationWithTensionAndFriction(tension: number, friction: number, animations: () => void, completion?: () => void): void
    static animationWithBouncinessAndSpeed(damping: number, velocity: number, animations: () => void, completion?: () => void): void
    static animationWithDurationDampingVelocity(duration: number, damping: number, velocity: number, animations: () => void, completion?: () => void): void // iOS Only
}

export class Color {
    static whiteColor: Color
    static blackColor: Color
    static clearColor: Color
    static redColor: Color
    static yellowColor: Color
    static greenColor: Color
    static blueColor: Color
    static brownColor: Color
    static cyanColor: Color
    static darkGrayColor: Color
    static grayColor: Color
    static lightGrayColor: Color
    static magentaColor: Color
    static orangeColor: Color
    static purpleColor: Color
    static colorWithWhite(white: number, alpha: number): Color
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
    constructor(r: number, g: number, b: number, a?: number)
    rgbHexNumber(): number
    rgbHexString(): string
    equals(toColor: Color | undefined): boolean
}

export interface Point {
    readonly x: number;
    readonly y: number;
}

export function PointMake(x: number, y: number): Point
export function PointEqual(point1: Point, point2: Point): boolean
export const PointZero: Point

export interface Size {
    readonly width: number;
    readonly height: number;
}

export function SizeMake(width: number, height: number): Size
export function SizeEqual(size1: Size, size2: Size): boolean
export const SizeZero: Size

export interface Rect {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}

export function RectMake(x: number, y: number, width: number, height: number): Rect
export const RectZero: Rect
export function RectEqual(rect1: Rect, rect2: Rect): boolean
export function RectInside(rect1: Rect, rect2: Rect): boolean

export interface Insets {
    readonly top: number;
    readonly left: number;
    readonly bottom: number;
    readonly right: number;
}

export function InsetsMake(top: number, left: number, bottom: number, right: number): Insets

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

export class LayoutConstraint {
    readonly firstItem?: View;
    readonly firstAttr?: LayoutAttribute;
    readonly relation: LayoutRelation;
    readonly secondItem?: View;
    readonly secondAttr?: LayoutAttribute;
    constant: number;
    readonly multiplier: number;
    priority: number;
    constructor(firstItem?: View, firstAttr?: LayoutAttribute, relation?: LayoutRelation, secondItem?: View, secondAttr?: LayoutAttribute, constant?: number, multiplier?: number)
    static constraintsWithVisualFormat(format: string, views: { [key: string]: View }): LayoutConstraint[]
}

export class ApplicationDelegate {
    window?: Window;
    applicationDidFinishLaunchingWithOptions(application: Application, launchOptions: Object): void
}

export class Application {
    constructor(t: any, delegate: ApplicationDelegate)
    delegate: ApplicationDelegate
    keyWindow?: Window
    sharedApplication?(): Application
}

export class Button extends View {
    readonly imageView: ImageView;
    readonly titleLabel: Label
    vertical: boolean;
    inset: number;
    title?: string
    font?: Font;
    image?: Image;
    color?: Color
    onHighlighted?: (highligted: boolean) => void
    onTouchUpInside?: () => void
}

export class Font {
    readonly familyName?: string;
    readonly pointSize: number;
    readonly fontWeight: string;
    readonly fontStyle: string;
    constructor(pointSize: number, fontWeight?: string, fontStyle?: string, familyName?: string)
    static systemFontOfSize(pointSize: number, weight?: string): Font
    static boldSystemFontOfSize(pointSize: number): Font
    static italicSystemFontOfSize(pointSize: number): Font
}

export enum ImageRenderingMode {
    Original,
    Template,
}

export class Image {
    readonly size: Size;
    readonly scale: number;
    readonly renderingMode: ImageRenderingMode;
    static assetsPath: string
    static fromURL(url: string, success: (image: Image) => void, failure: (error: Error) => void): void
    static fromAssets(named: string, success: (image: Image) => void, failure: (error: Error) => void): void
    static fromAssetsWithScales(named: string, scales: number[] | number, success: (image: Image) => void, failure: (error: Error) => void): void
    imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image
}

export enum ContentMode {
    ScaleToFill,
    ScaleAspectFit,
    ScaleAspectFill,
}

export class ImageView extends View {
    image?: Image;
    contentMode: ContentMode;
}

export enum TextAlignment {
    Left,
    Center,
    Right,
}

export enum TextVerticalAlignment {
    Top,
    Center,
    Bottom,
}

export enum LineBreakMode {
    WordWrapping = 0,
    TruncatingTail = 4,
}

export class Label extends View {
    text?: string;
    font?: Font;
    textColor: Color
    textAlignment: TextAlignment
    numberOfLines: number
    lineBreakMode: LineBreakMode
    lineSpace: number
    textRectForBounds(bounds: Rect): Rect
}

export interface ListItem {
    [key: string]: any,
    reuseIdentifier: string
    rowHeight: (width: number) => number
}

export enum ListSelectionStyle {
    None,
    Gray,
}

export class ListCell extends View {
    readonly reuseIdentifier: string
    readonly currentItem?: ListItem
    readonly contentView: View
    selectionStyle: ListSelectionStyle
    onSelected?: () => void
    onRender?: () => void
    didSelected(): void
    didRender(): void
}

export class ListView extends ScrollView {

    items: ListItem[]
    renderItem?: (cell: ListCell, item: ListItem) => void
    register(clazz: typeof ListCell, reuseIdentifier: string): void
    reloadData(): void

}

export class Screen {
    static mainScreen: () => Screen
    readonly width: number;
    readonly height: number;
    readonly scale: number;
    bounds(): Rect
    static withScale(value: number): number
    static outScale(value: number): number
}

export class ScrollView extends View {
    contentOffset: Point
    contentSize: Size
    isDirectionalLockEnabled: boolean
    bounces: boolean
    isScrollEnabled: boolean
    showsHorizontalScrollIndicator: boolean
    showsVerticalScrollIndicator: boolean
    alwaysBounceVertical: boolean
    alwaysBounceHorizontal: boolean
    onScroll?: (scrollView: ScrollView) => void
}

export class TransformMatrix {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    readonly tx: number;
    readonly ty: number;
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number)
    static unmatrix(matrix: TransformMatrix): { scale: { x: number, y: number }, degree: number, translate: { x: number, y: number } }
    static isIdentity(matrix: TransformMatrix): boolean
    static postScale(matrix: TransformMatrix, x?: number, y?: number): TransformMatrix
    static postTranslate(matrix: TransformMatrix, x?: number, y?: number): TransformMatrix
    static postRotate(matrix: TransformMatrix, angle: number): TransformMatrix
    static concat(preMatrix: TransformMatrix, postMatrix: TransformMatrix): TransformMatrix
}

export class Window extends View {
    rootViewController?: ViewController
    makeKeyAndVisible(): void
    endEditing(): void
}

export class ViewController {
    readonly view: View
    loadView(): void
    viewDidLoad(): void
    viewWillAppear(): void
    viewDidAppear(): void
    viewWillDisappear(): void
    viewDidDisappear(): void
    viewWillLayoutSubviews(): void
    viewDidLayoutSubviews(): void
    readonly parentViewController?: ViewController
    childViewControllers: ViewController[]
    addChildViewController(childController: ViewController): void
    removeFromParentViewController(): void
    willMoveToParentViewController(parent?: ViewController): void
    didMoveToParentViewController(parent?: ViewController): void
    keyboardWillShow(frame: Rect, duration: number): void
    keyboardWillHide(duration: number): void
    supportOrientations: DeviceOrientation[]
    readonly navigationController?: NavigationController
}

export class NavigationController extends ViewController {
    constructor(rootViewController?: ViewController)
    pushViewController(viewController: ViewController, animated?: boolean): void
    popViewController(animated?: boolean): ViewController | undefined
    popToViewController(viewController: ViewController, animated?: boolean): ViewController[]
    popToRootViewController(animated?: boolean): ViewController[]
}

export class CanvasView extends View {

    globalAlpha: number
    fillStyle?: Color
    strokeStyle?: Color
    lineCap?: string
    lineJoin?: string
    lineWidth: number
    miterLimit: number
    rect(x: number, y: number, width: number, height: number): void
    fillRect(x: number, y: number, width: number, height: number): void
    strokeRect(x: number, y: number, width: number, height: number): void
    fill(): void
    stroke(): void
    beginPath(): void
    moveTo(x: number, y: number): void
    closePath(): void
    lineTo(x: number, y: number): void
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void
    arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise?: boolean): void
    isPointInPath(x: number, y: number): void
    postScale(x: number, y: number): void
    postRotate(angle: number): void
    postTranslate(x: number, y: number): void
    postTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void
    setTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void
    save(): void
    restore(): void
    clear(): void

}

export class CustomView extends View {

    onMessage?: (message: string) => any
    props: any
    constructor(className: string, rect?: Rect)
    emitMessage(message: any): any
    handleMessage(message: any): any

}

export enum DeviceOrientation {
    Unknown = 0,
    Portrait = 1,
    PortraitUpsideDown = 2,
    LandscapeLeft = 3,
    LandscapeRight = 4,
    FaceUp = 5,
    FaceDown = 6,
}

export class Device {

    static current: Device

    name: string
    systemName: string
    systemVersion: string
    xtRuntimeVersion: string
    model: string
    orientation: DeviceOrientation

    isiOS(): Boolean
    isAndroid(): Boolean
    isWeb(): Boolean

}

export enum TextFieldViewMode {
    Never,
    WhileEditing,
    UnlessEditing,
    Always,
}

export enum KeyboardType {
    Default = 0,
    ASCIICapable = 1,
    NumbersAndPunctuation = 2,
}

export enum ReturnKeyType {
    Default = 0,
    Go = 1,
    Next = 4,
    Search = 6,
    Send = 7,
    Done = 9,
}

export class TextField extends View {

    text?: string;
    font?: Font;
    textColor: Color
    textAlignment: TextAlignment
    placeholder?: string;
    placeholderColor?: Color
    clearsOnBeginEditing: Boolean
    readonly editing: Boolean
    clearButtonMode: TextFieldViewMode
    leftView?: View
    leftViewMode: TextFieldViewMode
    rightView?: View
    rightViewMode: TextFieldViewMode

    // TextInput
    allowAutocapitalization: Boolean
    allowAutocorrection: Boolean
    allowSpellChecking: Boolean
    keyboardType: KeyboardType
    returnKeyType: ReturnKeyType
    enablesReturnKeyAutomatically: Boolean
    secureTextEntry: Boolean

    // TextField Delegate
    shouldBeginEditing?: () => Boolean
    didBeginEditing?: () => void
    shouldEndEditing?: () => Boolean
    didEndEditing?: () => void
    shouldChange?: (inRange: { location: number, length: number }, replacementString: string) => Boolean
    shouldClear?: () => Boolean
    shouldReturn?: () => Boolean

    // methods
    focus(): void
    blur(): void

}

export class TextView extends View {

    text?: string;
    font?: Font;
    textColor: Color
    textAlignment: TextAlignment
    readonly editing: Boolean

    // TextInput
    allowAutocapitalization: Boolean
    allowAutocorrection: Boolean
    allowSpellChecking: Boolean
    keyboardType: KeyboardType
    returnKeyType: ReturnKeyType
    enablesReturnKeyAutomatically: Boolean
    secureTextEntry: Boolean

    // TextField Delegate
    shouldBeginEditing?: () => Boolean
    didBeginEditing?: () => void
    shouldEndEditing?: () => Boolean
    didEndEditing?: () => void
    shouldChange?: (inRange: { location: number, length: number }, replacementString: string) => Boolean

    // methods
    focus(): void
    blur(): void

}