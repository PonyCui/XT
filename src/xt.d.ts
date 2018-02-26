export interface Releasable {
    retain(owner?: any): this;
    release(): this;
}

export as namespace XT;

export enum ClassType {
    Unknown,
    ObjC,
    Java,
    JavaScript,
}

export class ClassLoader {
    static loadClass(classType: ClassType, className: string | Object, globalName: string): void
}

export class Debug {
    static run(id: string, t: any, s: any): void
    static stringify(object: any): string
}

export as namespace UI;

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

export class Context implements Releasable {

    retain(owner?: any): this
    release(): this

    static startWithNamed(name: string, options: any, completion: (rootViewController: ViewController) => void): Context
    static startWithURL(url: string, options: any, completion: (rootViewController: ViewController) => void, failure: (error: Error) => void): Context

}

export class View implements Releasable {

    retain(owner?: any): this;
    release(): this;
    constructor()

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
    transform: TransformMatrix;
    // Mark: View Rendering
    /**
     * defaults to false, if true, contents will not render out of bounds.
     */
    clipsToBounds: boolean;
    /**
     * defaults to undefined,.
     */
    backgroundColor: Color;
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
    contentMode: ContentMode;
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
    borderColor: Color;
    /**
     * defaults to undefined.
     */
    shadowColor: Color;
    /**
     * defaults to 0;
     */
    shadowOpacity: number;
    /**
     * defaults to {width:0, height: -3};
     */
    shadowOffset: Size;
    /**
     * defaults to 3;
     */
    shadowRadius: number;
    // Mark: View Hierarchy
    /**
     * add tag to view, view could be found with View.viewWithTag(number).
     */
    tag: number;
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
    onLongPress?: (state: InteractionState, viewLocation: () => Point, absLocation: Point) => void
    onPan?: (state: InteractionState, viewLocation: () => Point, absLocation: Point, velocity: Point, translation: Point) => void
    // Mark: View Animation
    static animationWithDuration(duration: number, animations: () => void, completion?: () => void): void
    static springAnimationDuration: number
    static animationWithBouncinessAndSpeed(damping: number, velocity: number, animations: () => void, completion?: () => void): void
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
    static constraintsWithVisualFormat(format: string, views?: { [key: string]: View } | Object): LayoutConstraint[]
}

export class ApplicationDelegate {
    window?: Window;
    applicationDidFinishLaunchingWithOptions(application: Application, launchOptions: Object): void
}

export class Application {
    constructor(t: any, delegate: ApplicationDelegate)
    delegate: ApplicationDelegate
    keyWindow?: Window
    static sharedApplication(): Application
    exit(): void
}

export class Button extends View {
    readonly imageView: ImageView;
    readonly titleLabel: Label
    vertical: boolean;
    inset: number;
    title?: string
    font: Font;
    image?: Image;
    color: Color
    onTouchDown?: () => void           
    onTouchDragInside?: () => void     
    onTouchDragOutside?: () => void    
    onTouchDragEnter?: () => void      
    onTouchDragExit?: () => void  
    onTouchUpInside?: () => void   
    onTouchUpOutside?: () => void     
    onTouchCancel?: () => void        
    onHighlighted?: (highligted: boolean) => void
    onHover?: (hovered: boolean) => void
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

export class Image implements Releasable {
    retain(owner?: any): this;
    release(): this;
    
    readonly size: Size;
    readonly scale: number;
    readonly renderingMode: ImageRenderingMode;
    static assetsPath: string
    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void): void
    static fromBase64(value: string, scale: number, bitmapWidth?: number, bitmapHeight?: number): Image | undefined
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
    text: string;
    font: Font;
    textColor: Color
    textAlignment: TextAlignment
    numberOfLines: number
    lineBreakMode: LineBreakMode
    letterSpace: number
    lineSpace: number
    textRectForBounds(bounds: Rect): Rect
}

export interface ListItem {
    [key: string]: any,
    reuseIdentifier: string
    rowHeight: (width: number) => number
}

export class ListEntity implements ListItem {
    [key: string]: any;
    reuseIdentifier: string;
    rowHeight: (width: number) => number;
}

export enum ListSelectionStyle {
    None,
    Gray,
}

export class ListCell extends View {
    readonly reuseIdentifier: string
    readonly currentItem?: ListItem
    readonly contentView: View
    readonly context?: any
    selectionStyle: ListSelectionStyle
    bottomVisible: boolean
    isLastCell: boolean
    bottomLineInsets: Insets
    didHighlighted(highlighted: boolean): void
    didSelected(): void
    didRender(): void
}

export class ListSection {

    public headerView?: View
    public footerView?: View
    public items: ListItem[];

}

export class ListView extends ScrollView {

    listHeaderView?: View
    listFooterView?: View
    items: (ListItem | ListSection)[]
    renderItem?: (cell: ListCell, item: ListItem) => void
    register(clazz: typeof ListCell, reuseIdentifier: string, context?: any): void
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
    isPagingEnabled: boolean
    isDirectionalLockEnabled: boolean
    bounces: boolean
    isScrollEnabled: boolean
    showsHorizontalScrollIndicator: boolean
    showsVerticalScrollIndicator: boolean
    alwaysBounceVertical: boolean
    alwaysBounceHorizontal: boolean
    onScroll?: (scrollView: ScrollView) => void
    setContentOffset(value: Point, animated: boolean): void
    scrollRectToVisible(rect: Rect, animated: boolean): void
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
    isIdentity(): boolean
    postScale(x?: number, y?: number): TransformMatrix
    postTranslate(x?: number, y?: number): TransformMatrix
    postRotate(angle: number): TransformMatrix
    concat(postMatrix: TransformMatrix): TransformMatrix
}

export class Window extends View {
    rootViewController?: ViewController
    firstResponder?: View
    makeKeyAndVisible(): void
    endEditing(): void
}

export enum KeyboardAvoidingMode {
    None,
    Pan,
}

export class ViewController implements Releasable {
    retain(owner?: any): this;
    release(): this;
    
    title: string
    readonly view: View
    readonly safeAreaInsets: Insets
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
    presentViewController(viewController: ViewController, animated?: boolean): void
    dismissViewController(animated?: boolean): void
    keyboardAvoidingMode(): KeyboardAvoidingMode
    keyboardWillShow(frame: Rect, duration: number): void
    keyboardWillHide(duration: number): void
    supportOrientations: DeviceOrientation[]
    readonly navigationController?: NavigationController
    readonly navigationBar: NavigationBar
    showNavigationBar(animated?: boolean): void
    hideNavigationBar(animated?: boolean): void
}

export class NavigationBarButtonItem {

    image?: Image
    title?: string
    customView?: View
    onTouchUpInside?: () => void

}

export class NavigationBar extends View {

    title: string
    translucent: boolean
    lightContent: boolean
    setLeftBarButtonItem(navigationItem?: NavigationBarButtonItem): void
    setLeftBarButtonItems(navigationItems: NavigationBarButtonItem[]): void
    setRightBarButtonItem(navigationItem?: NavigationBarButtonItem): void
    setRightBarButtonItems(navigationItems: NavigationBarButtonItem[]): void

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
    fillStyle: Color
    strokeStyle: Color
    lineCap: string
    lineJoin: string
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
    isPointInPath(x: number, y: number): boolean
    postScale(x: number, y: number): void
    postRotate(angle: number): void
    postTranslate(x: number, y: number): void
    postTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void
    setTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void
    save(): void
    restore(): void
    clear(): void

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

    text: string;
    font: Font;
    textColor: Color
    textAlignment: TextAlignment
    placeholder: string;
    placeholderColor: Color
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

    text: string;
    font: Font;
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

export interface TextMeasureParams {

    font: Font;
    inRect: Rect;
    numberOfLines?: number
    letterSpace?: number
    lineSpace?: number

}

export class TextMeasurer {

    static measureText(text: string, params: TextMeasureParams): Rect

}

export enum HRViewPosition {
    Top,
    Middle,
    Bottom,
    Left,
    VMiddle,
    Right,
}

export class HRView extends View {
    position: HRViewPosition
    color: Color
}

export class Alert {
    public buttonTitle: string
    constructor(message: string)
    show(callback?: () => void): void
}

export class Confirm {
    public confirmTitle: string
    public cancelTitle: string
    constructor(message: string)
    show(resolve: () => void, reject: () => void): void
}

export class Prompt {
    public placeholder: string
    public defaultValue: string
    public confirmTitle: string
    public cancelTitle: string
    constructor(message: string)
    show(resolve: (value: string) => void, reject: () => void): void
}

export class WebView extends View {
    load(URLString: string): void
    onStart?: () => void
    onFinish?: () => void
    onFail?: (error: Error) => void
}

export class Switch extends View {
    on: boolean
    onValueChanged?: () => void
    setOn(value: boolean, animated: boolean): void
}

export class Slider extends View {
    value: number
    onValueChanged?: () => void
    setValue(value: number, animated: boolean): void
}

export enum ActivityIndicatorViewStyle {
    Regular,
    Large,
}

export class ActivityIndicatorView extends View {
    style: ActivityIndicatorViewStyle
    readonly animating: boolean
    hidesWhenStopped: boolean
    startAnimating(): void
    stopAnimating(): void
}

export as namespace NS;

export class Data implements Releasable {
    retain(): this
    release(): this
    static initWithString(value: string): Data
    static initWithBytes(bytes: Uint8Array): Data
    static initWithData(data: Data): Data
    static initWithBase64EncodedString(string: string): Data | undefined
    static initWithBase64EncodedData(data: Data): Data | undefined
    protected constructor()
    isEqualTo(data: Data): boolean
    length(): number
    getBytes(): Uint8Array
    base64EncodedString(): string
    base64EncodedData(): Data
    utf8String(): string | undefined
    md5(): string
    sha1(): string
}

export class FileManager {
    static document: FileManager
    static cache: FileManager
    static tmp: FileManager
    static sdcard: FileManager
    protected constructor()
    writeData(data: Data, path: string): boolean
    readData(path: string): Data | undefined
    isFileExist(path: string): boolean
    deleteFile(path: string): boolean
    list(path: string): string[]
}

export class Notification {
    readonly name: string
    readonly object: any
    readonly userInfo: { [key: string]: any }
}

export class NotificationCenter {
    static default: NotificationCenter
    protected constructor()
    addObserver(name: string, triggerBlock: (notification: Notification) => void): string
    removeObserver(handler: string): void
    postNotification(name: string, object: any, userInfo: { [key: string]: any }): void
}

export enum URLCachePolily {
    UseProtocolCachePolicy = 0,
    ReloadIgnoringLocalCacheData = 1,
    ReturnCacheDataElseLoad = 2,
    ReturnCacheDataDontLoad = 3,
}

export class URLRequest implements Releasable {
    readonly url: string
    readonly timeout: number
    readonly cachePolicy: URLCachePolily
    constructor(url: string, timeout?: number, cachePolicy?: URLCachePolily)
    setHTTPMethod(value: string): void
    setHTTPHeader(value: string, key: string): void
    setHTTPBody(value: string | Data): void
    setHTTPShouldHandleCookies(value: boolean): void
    setHTTPShouldUsePipelining(value: boolean): void
    setAllowsCellularAccess(value: boolean): void
    retain(): this
    release(): this
}

export class URLResponse {
    expectedContentLength: number
    suggestedFilename?: string
    mimeType?: string
    textEncodingName?: string
    url?: string
    allHeaderFields: { [key: string]: any }
    statusCode: number
}

export class URLSession {
    static sharedSession: URLSession
    dataTaskWithURL(url: string, completionHandler: (data?: Data, response?: URLResponse, error?: Error) => void): URLSessionTask
    dataTaskWithRequest(req: URLRequest, completionHandler: (data?: Data, response?: URLResponse, error?: Error) => void): URLSessionTask
}

export class URLSessionTask implements Releasable {
    retain(): this
    release(): this
    cancel(): void
    resume(): void
}

export class UserDefaults {
    static standard: UserDefaults
    constructor(suite: string | undefined)
    set(object: any, forKey: string): void
    get(forKey: string): any
}

export class WebSocket implements Releasable {
    retain(): this
    release(): this
    constructor(url: string)
    onOpen?: () => void
    onClose?: (code: number, reason: string) => void
    onFail?: (error: Error) => void
    onMessage?: (message: Data | string) => void
    sendData(data: Data): void
    sendString(string: string): void
    close(): void
}


declare global {
    var require: (path: string) => any
    const XT: {
        ClassType: typeof ClassType,
        ClassLoader: typeof ClassLoader,
        Debug: typeof Debug,
    }
    const UI: {
        Releasable: Releasable,
        InteractionState: typeof InteractionState,
        SwipeDirection: typeof SwipeDirection,
        Context: typeof Context,
        View: typeof View,
        Color: typeof Color,
        Point: Point,
        PointMake: (x: number, y: number) => Point,
        PointEqual: (point1: Point, point2: Point) => boolean,
        PointZero: Point,
        Size: Size,
        SizeMake: (width: number, height: number) => Size,
        SizeEqual: (size1: Size, size2: Size) => boolean,
        SizeZero: Size,
        Rect: Rect,
        RectMake: (x: number, y: number, width: number, height: number) => Rect,
        RectZero: Rect,
        RectEqual: (rect1: Rect, rect2: Rect) => boolean,
        RectInside: (rect1: Rect, rect2: Rect) => boolean,
        Insets: Insets,
        InsetsMake: (top: number, left: number, bottom: number, right: number) => Insets,
        LayoutAttribute: typeof LayoutAttribute,
        LayoutRelation: typeof LayoutRelation,
        LayoutConstraint: typeof LayoutConstraint,
        ApplicationDelegate: typeof ApplicationDelegate,
        Application: typeof Application,
        Button: typeof Button,
        Font: typeof Font,
        ImageRenderingMode: typeof ImageRenderingMode,
        Image: typeof Image,
        ContentMode: typeof ContentMode,
        ImageView: typeof ImageView,
        TextAlignment: typeof TextAlignment,
        TextVerticalAlignment: typeof TextVerticalAlignment,
        LineBreakMode: typeof LineBreakMode,
        Label: typeof Label,
        ListItem: ListItem,
        ListSection: typeof ListSection,
        ListEntity: typeof ListEntity,
        ListSelectionStyle: typeof ListSelectionStyle,
        ListCell: typeof ListCell,
        ListView: typeof ListView,
        Screen: typeof Screen,
        ScrollView: typeof ScrollView,
        TransformMatrix: typeof TransformMatrix,
        Window: typeof Window,
        KeyboardAvoidingMode: typeof KeyboardAvoidingMode,
        ViewController: typeof ViewController,
        NavigationBarButtonItem: typeof NavigationBarButtonItem,
        NavigationBar: typeof NavigationBar,
        NavigationController: typeof NavigationController,
        CanvasView: typeof CanvasView,
        DeviceOrientation: typeof DeviceOrientation,
        Device: typeof Device,
        TextFieldViewMode: typeof TextFieldViewMode,
        KeyboardType: typeof KeyboardType,
        ReturnKeyType: typeof ReturnKeyType,
        TextField: typeof TextField,
        TextView: typeof TextView,
        TextMeasureParams: TextMeasureParams,
        TextMeasurer: typeof TextMeasurer,
        HRView: typeof HRView,
        Alert: typeof Alert,
        Confirm: typeof Confirm,
        Prompt: typeof Prompt,
        WebView: typeof WebView,
        Switch: typeof Switch,
        Slider: typeof Slider,
        ActivityIndicatorViewStyle: typeof ActivityIndicatorViewStyle,
        ActivityIndicatorView: typeof ActivityIndicatorView,
    };
    const NS: {
        Data: typeof Data,
        FileManager: typeof FileManager,
        Notification: typeof Notification,
        NotificationCenter: typeof NotificationCenter,
        URLCachePolily: typeof URLCachePolily,
        URLRequest: typeof URLRequest,
        URLResponse: typeof URLResponse,
        URLSession: typeof URLSession,
        URLSessionTask: typeof URLSessionTask,
        UserDefaults: typeof UserDefaults,
        WebSocket: typeof WebSocket,
    }
}