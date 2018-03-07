export interface Releasable {
    retain(owner?: any): this;
    release(): this;
}

export as namespace XT;

export var minSDK: string
export const currentSDK: string
export const platform: "iOS" | "Android" | "Web"

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
    frame: Rect;
    bounds: Rect;
    center: Point;
    transform: TransformMatrix;
    // Mark: View Rendering
    clipsToBounds: boolean;
    backgroundColor: Color;
    alpha: number;
    opaque: boolean;
    hidden: boolean;
    contentMode: ContentMode;
    maskView?: View
    tintColor: Color
    tintColorDidChange(): void
    // Mark: View Layer-Back Rendering
    cornerRadius: number;
    borderWidth: number;
    borderColor: Color;
    shadowColor: Color;
    shadowOpacity: number;
    shadowOffset: Size;
    shadowRadius: number;
    // Mark: View Hierarchy
    tag: number;
    superview?: View
    subviews: View[]
    window?: Window
    removeFromSuperview(): void
    insertSubviewAtIndex(subview: View, atIndex: number): void
    exchangeSubviewAtIndex(index1: number, index2: number): void
    addSubview(subview: View): void
    insertSubviewBelow(subview: View, siblingSubview: View): void
    insertSubviewAbove(subview: View, siblingSubview: View): void
    bringSubviewToFront(subview: View): void
    sendSubviewToBack(subview: View): void
    didAddSubview(subview: View): void
    willRemoveSubview(subview: View): void
    willMoveToSuperview(newSuperview?: View): void
    didMoveToSuperview(): void
    willMoveToWindow(newWindow?: Window): void
    didMoveToWindow(): void
    isDescendantOfView(view: View): boolean
    viewWithTag(tag: number): View | undefined
    setNeedsLayout(): void
    layoutIfNeeded(): void
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
    static colorWithHex(hex: string): Color
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
    readonly delegate: ApplicationDelegate
    readonly keyWindow?: Window
    static sharedApplication(): Application
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
    onTouchDown?: (sender: this) => void
    onTouchDragInside?: (sender: this) => void
    onTouchDragOutside?: (sender: this) => void
    onTouchDragEnter?: (sender: this) => void
    onTouchDragExit?: (sender: this) => void
    onTouchUpInside?: (sender: this) => void
    onTouchUpOutside?: (sender: this) => void
    onTouchCancel?: (sender: this) => void
    onHighlighted?: (sender: this, highligted: boolean) => void
    onHover?: (sender: this, hovered: boolean) => void
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
    loadImage(url: string, fadeIn?: boolean): void
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

export class RefreshControl {
    enabled: boolean
    color: Color
    readonly isRefreshing: boolean
    endRefreshing(): void
    onRefresh?: (sender: this) => void
}

export class LoadMoreControl {
    enabled: boolean
    color: Color
    readonly isLoading: boolean
    endLoading(): void
    onLoad?: (sender: this) => void
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
    readonly selectionView: View
    readonly contentView: View
    readonly context?: any
    selectionStyle: ListSelectionStyle
    bottomVisible: boolean
    bottomLineInsets: Insets
    didHighlighted(highlighted: boolean): void
    didSelected(): void
    didRender(): void
}

export class ListSection {
    headerView?: View
    footerView?: View
    items: ListItem[];
}

export class ListView extends ScrollView {
    refreshControl?: RefreshControl
    loadMoreControl?: LoadMoreControl
    listHeaderView?: View
    listFooterView?: View
    items: (ListItem | ListSection)[]
    renderItem?: (cell: ListCell, item: ListItem) => void
    register(clazz: typeof ListCell, reuseIdentifier: string, context?: any): void
    reloadData(): void
}

export class Screen {
    static mainScreen: Screen
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
    contentInset: Insets
    isPagingEnabled: boolean
    isDirectionalLockEnabled: boolean
    isScrollEnabled: boolean
    bounces: boolean
    alwaysBounceVertical: boolean
    alwaysBounceHorizontal: boolean
    showsHorizontalScrollIndicator: boolean
    showsVerticalScrollIndicator: boolean
    onScroll?: (sender: this) => void
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

export enum ViewControllerLayoutOptions {
    None,
    AndroidLight,
    AndroidDark,
}

export class ViewController implements Releasable {
    retain(owner?: any): this;
    release(): this;
    title: string
    readonly view: View
    layoutOptions: ViewControllerLayoutOptions[]
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
    lineCap: "butt" | "round" | "square"
    lineJoin: "bevel" | "round" | "miter"
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
    model: string
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
    buttonTitle: string
    constructor(message: string)
    show(callback?: () => void): void
}

export class Confirm {
    confirmTitle: string
    cancelTitle: string
    constructor(message: string)
    show(resolve: () => void, reject: () => void): void
}

export class Prompt {
    placeholder: string
    defaultValue: string
    confirmTitle: string
    cancelTitle: string
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
    onValueChanged?: (sender: this) => void
    setOn(value: boolean, animated: boolean): void
}

export class Slider extends View {
    value: number
    onValueChanged?: (sender: this) => void
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
    startAnimating(delay?: number): void
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
    setHTTPMethod(value: "GET" | "POST" | "PUT" | "DELETE"): void
    setHTTPHeader(value: string, key: string): void
    setHTTPBody(value: string | Data): void
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

declare var require: (path: string) => any;

declare global {
    const XT: {
        minSDK: typeof minSDK,
        currentSDK: typeof currentSDK,
        platform: typeof platform,
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
        RefreshControl: typeof RefreshControl,
        LoadMoreControl: typeof LoadMoreControl,
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
        ViewControllerLayoutOptions: typeof ViewControllerLayoutOptions,
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