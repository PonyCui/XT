export as namespace XT;

export var minSDK: string /* @available(0.1.1) */
export const currentSDK: string /* @available(0.1.1) */
export const platform: "iOS" | "Android" | "Web" /* @available(0.1.1) */

export class XTBaseArray<T> extends Array {
    constructor(items?: T[])
    clear(): void
}

export class XTBaseObject {
    retain(owner?: any): this
    release(): this
    constructor(objects?: { [key: string]: any } | undefined, isBaseObject?: boolean)
    objectRef: string /** @private */
}

export enum XTClassType /* @available(0.1.1) */ {
    Unknown,
    ObjC,
    Java,
    JavaScript,
}

export class XTClassLoader /* @available(0.1.1) */ {
    static loadClass(classType: XTClassType, className: string | Object, globalName: string): void
}

export class XTExtObject extends XTBaseObject /* @available(0.2.0) */ {
    static className: string
    defineFunction(prop: string): any
    defineProperty(prop: string, defaultValue?: any): any
}

export class XTDebug /* @available(0.1.1) */ {
    static run(id: string, t: any, s: any): void
    static stringify(object: any): string
}

export as namespace UI;

export enum UIInteractionState /* @available(0.1.1) */ {
    Began,
    Changed,
    Ended,
    Cancelled,
}

export enum UISwipeDirection /* @available(0.1.1) */ {
    ToLeft,
    ToRight,
    ToTop,
    ToBottom,
}

export class UIContext extends XT.BaseObject /* @available(0.1.1) */ {
    static bundleURL: string | undefined
    static startWithNamed(name: string, options: any, completion: (rootViewController: UIViewController) => void): UIContext
    static startWithURL(url: string, options: any, completion: (rootViewController: UIViewController) => void, failure: (error: Error) => void): UIContext
}

export class UIView extends XT.BaseObject /* @available(0.1.1) */ {
    constructor()
    frame: UIRect;
    bounds: UIRect;
    center: UIPoint;
    transform: UITransformMatrix;
    // Mark: UIView Rendering
    clipsToBounds: boolean;
    backgroundColor: UIColor;
    alpha: number;
    opaque: boolean;
    hidden: boolean;
    contentMode: UIContentMode;
    maskView?: UIView
    tintColor: UIColor
    tintColorDidChange(): void
    // Mark: UIView Layer-Back Rendering
    cornerRadius: number;
    borderWidth: number;
    borderColor: UIColor;
    shadowColor: UIColor;
    shadowOpacity: number;
    shadowOffset: UISize;
    shadowRadius: number;
    // Mark: UIView Hierarchy
    tag: number;
    superview?: UIView
    subviews: UIView[]
    window?: UIWindow
    removeFromSuperview(): void
    insertSubviewAtIndex(subview: UIView, atIndex: number): void
    exchangeSubviewAtIndex(index1: number, index2: number): void
    addSubview(subview: UIView): void
    insertSubviewBelow(subview: UIView, siblingSubview: UIView): void
    insertSubviewAbove(subview: UIView, siblingSubview: UIView): void
    bringSubviewToFront(subview: UIView): void
    sendSubviewToBack(subview: UIView): void
    didAddSubview(subview: UIView): void
    willRemoveSubview(subview: UIView): void
    willMoveToSuperview(newSuperview?: UIView): void
    didMoveToSuperview(): void
    willMoveToWindow(newWindow?: UIWindow): void
    didMoveToWindow(): void
    isDescendantOfView(view: UIView): boolean
    viewWithTag(tag: number): UIView | undefined
    setNeedsLayout(): void
    layoutIfNeeded(): void
    layoutSubviews(): void
    setNeedsDisplay(): void
    // Mark: UIView UILayoutConstraint
    constraints: UILayoutConstraint[]
    addConstraint(constraint: UILayoutConstraint): void
    addConstraints(constraints: UILayoutConstraint[]): void
    removeConstraint(constraint: UILayoutConstraint): void
    removeAllConstraints(): void
    // Mark: UIView Interactive
    static UIInteractionState: UIInteractionState
    static UISwipeDirection: UISwipeDirection
    userInteractionEnabled: boolean;
    multipleTouchEnabled: boolean;
    longPressDuration: number;
    onTap?: () => void
    onDoubleTap?: () => void
    onLongPress?: (state: UIInteractionState, viewLocation: () => UIPoint, absLocation: UIPoint) => void
    onPan?: (state: UIInteractionState, viewLocation: () => UIPoint, absLocation: UIPoint, velocity: UIPoint, translation: UIPoint) => void
    onRotate?: (state: UIInteractionState, degree: number) => void /** @private */
    onPinch?: (state: UIInteractionState, scale: number) => void /** @private */
    // Mark: UIView Animation
    static animationWithDuration(duration: number, animations: () => void, completion?: () => void): void
    static springAnimationDuration: number
    static animationWithBouncinessAndSpeed(damping: number, velocity: number, animations: () => void, completion?: () => void): void
}

export class UIColor /* @available(0.1.1) */ {
    static whiteColor: UIColor
    static blackColor: UIColor
    static clearColor: UIColor
    static redColor: UIColor
    static yellowColor: UIColor
    static greenColor: UIColor
    static blueColor: UIColor
    static brownColor: UIColor
    static cyanColor: UIColor
    static darkGrayColor: UIColor
    static grayColor: UIColor
    static lightGrayColor: UIColor
    static magentaColor: UIColor
    static orangeColor: UIColor
    static purpleColor: UIColor
    static colorWithWhite(white: number, alpha: number): UIColor
    static colorWithHex(hex: string): UIColor
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
    constructor(r: number, g: number, b: number, a?: number)
    rgbHexNumber(): number
    rgbHexString(): string
    equals(toColor: UIColor | undefined): boolean
}

export interface UIPoint /* @available(0.1.1) */ {
    readonly x: number;
    readonly y: number;
}

export function UIPointMake(x: number, y: number): UIPoint /* @available(0.1.1) */
export function UIPointEqual(point1: UIPoint, point2: UIPoint): boolean /* @available(0.1.1) */
export const UIPointZero: UIPoint /* @available(0.1.1) */

export interface UISize /* @available(0.1.1) */ {
    readonly width: number;
    readonly height: number;
}

export function UISizeMake(width: number, height: number): UISize /* @available(0.1.1) */
export function UISizeEqual(size1: UISize, size2: UISize): boolean /* @available(0.1.1) */
export const UISizeZero: UISize /* @available(0.1.1) */

export interface UIRect /* @available(0.1.1) */ {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}

export function UIRectMake(x: number, y: number, width: number, height: number): UIRect /* @available(0.1.1) */
export const UIRectZero: UIRect /* @available(0.1.1) */
export function UIRectEqual(rect1: UIRect, rect2: UIRect): boolean /* @available(0.1.1) */
export function UIRectInside(rect1: UIRect, rect2: UIRect): boolean /* @available(0.1.1) */

export interface UIInsets /* @available(0.1.1) */ {
    readonly top: number;
    readonly left: number;
    readonly bottom: number;
    readonly right: number;
}

export function UIInsetsMake(top: number, left: number, bottom: number, right: number): UIInsets /* @available(0.1.1) */

export enum UILayoutAttribute /* @available(0.1.1) */ {
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

export enum UILayoutRelation /* @available(0.1.1) */ {
    Less = -1,
    Equal = 0,
    Greater = 1,
}

export class UILayoutConstraint /* @available(0.1.1) */ {
    readonly firstItem?: UIView;
    readonly firstAttr?: UILayoutAttribute;
    readonly relation: UILayoutRelation;
    readonly secondItem?: UIView;
    readonly secondAttr?: UILayoutAttribute;
    constant: number;
    readonly multiplier: number;
    priority: number;
    constructor(firstItem?: UIView, firstAttr?: UILayoutAttribute, relation?: UILayoutRelation, secondItem?: UIView, secondAttr?: UILayoutAttribute, constant?: number, multiplier?: number)
    static constraintsWithVisualFormat(format: string, views?: { [key: string]: UIView } | Object): UILayoutConstraint[]
}

export class UIApplicationDelegate /* @available(0.1.1) */ {
    window?: UIWindow;
    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: Object): void
}

export class UIApplication /* @available(0.1.1) */ {
    constructor(t: any, delegate: UIApplicationDelegate)
    readonly delegate: UIApplicationDelegate
    readonly keyWindow?: UIWindow
    static sharedApplication(): UIApplication
}

export class UIButton extends UIView /* @available(0.1.1) */ {
    readonly imageView: UIImageView;
    readonly titleLabel: UILabel
    vertical: boolean;
    inset: number;
    title?: string
    font: UIFont;
    image?: UIImage;
    color: UIColor
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

export class UIFont /* @available(0.1.1) */ {
    readonly familyName?: string;
    readonly pointSize: number;
    readonly fontWeight: string;
    readonly fontStyle: string;
    constructor(pointSize: number, fontWeight?: string, fontStyle?: string, familyName?: string)
    static systemFontOfSize(pointSize: number, weight?: string): UIFont
    static boldSystemFontOfSize(pointSize: number): UIFont
    static italicSystemFontOfSize(pointSize: number): UIFont
}

export enum UIImageRenderingMode /* @available(0.1.1) */ {
    Original,
    Template,
}

export class UIImage extends XT.BaseObject /* @available(0.1.1) */ {
    readonly size: UISize;
    readonly scale: number;
    readonly renderingMode: UIImageRenderingMode;
    static fromURL(url: string, success: (image: UIImage) => void, failure?: (error: Error) => void): void
    static fromBase64(value: string, scale: number, bitmapWidth?: number, bitmapHeight?: number): UIImage | undefined
    imageWithImageRenderingMode(renderingMode: UIImageRenderingMode): UIImage
}

export enum UIContentMode /* @available(0.1.1) */ {
    ScaleToFill,
    ScaleAspectFit,
    ScaleAspectFill,
}

export class UIImageView extends UIView /* @available(0.1.1) */ {
    image?: UIImage;
    contentMode: UIContentMode;
    loadImage(url: string, fadeIn?: boolean): void
}

export enum UITextAlignment /* @available(0.1.1) */ {
    Left,
    Center,
    Right,
}

export enum UITextVerticalAlignment /* @available(0.1.1) */ {
    Top,
    Center,
    Bottom,
}

export enum UILineBreakMode /* @available(0.1.1) */ {
    WordWrapping = 0,
    TruncatingTail = 4,
}

export class UILabel extends UIView /* @available(0.1.1) */ {
    text: string;
    font: UIFont;
    textColor: UIColor
    textAlignment: UITextAlignment
    numberOfLines: number
    lineBreakMode: UILineBreakMode
    letterSpace: number
    lineSpace: number
    textRectForBounds(bounds: UIRect): UIRect
}

export class UIRefreshControl /* @available(0.1.1) */ {
    enabled: boolean
    color: UIColor
    readonly isRefreshing: boolean
    endRefreshing(): void
    onRefresh?: (sender: this) => void
}

export class UILoadMoreControl /* @available(0.1.1) */ {
    enabled: boolean
    color: UIColor
    readonly isLoading: boolean
    endLoading(): void
    onLoad?: (sender: this) => void
}

export interface UIListItem /* @available(0.1.1) */ {
    [key: string]: any,
    reuseIdentifier: string
    rowHeight: (width: number) => number
}

export class UIListEntity implements UIListItem /* @available(0.1.1) */ {
    [key: string]: any;
    reuseIdentifier: string;
    rowHeight: (width: number) => number;
}

export enum UIListSelectionStyle /* @available(0.1.1) */ {
    None,
    Gray,
}

export class UIListCell extends UIView /* @available(0.1.1) */ {
    readonly reuseIdentifier: string
    readonly currentItem?: UIListItem
    readonly selectionView: UIView
    readonly contentView: UIView
    readonly context?: any
    selectionStyle: UIListSelectionStyle
    bottomVisible: boolean
    bottomLineInsets: UIInsets
    didHighlighted(highlighted: boolean): void
    didSelected(): void
    didRender(): void
}

export class UIListSection /* @available(0.1.1) */ {
    headerView?: UIView
    footerView?: UIView
    items: UIListItem[];
}

export class UIListView extends UIScrollView /* @available(0.1.1) */ {
    refreshControl?: UIRefreshControl
    loadMoreControl?: UILoadMoreControl
    listHeaderView?: UIView
    listFooterView?: UIView
    items: (UIListItem | UIListSection)[]
    register(clazz: typeof UIListCell, reuseIdentifier: string, context?: any): void
    reloadData(): void
}

export class UIScreen /* @available(0.1.1) */ {
    static mainScreen: UIScreen
    readonly width: number;
    readonly height: number;
    readonly scale: number;
    bounds(): UIRect
    static withScale(value: number): number
    static outScale(value: number): number
}

export class UIScrollView extends UIView /* @available(0.1.1) */ {
    contentOffset: UIPoint
    contentSize: UISize
    contentInset: UIInsets
    isPagingEnabled: boolean
    isDirectionalLockEnabled: boolean
    isScrollEnabled: boolean
    bounces: boolean
    alwaysBounceVertical: boolean
    alwaysBounceHorizontal: boolean
    showsHorizontalScrollIndicator: boolean
    showsVerticalScrollIndicator: boolean
    onScroll?: (sender: this) => void
    setContentOffset(value: UIPoint, animated: boolean): void
    scrollRectToVisible(rect: UIRect, animated: boolean): void
}

export class UITransformMatrix /* @available(0.1.1) */ {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    readonly tx: number;
    readonly ty: number;
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number)
    static unmatrix(matrix: UITransformMatrix): { scale: { x: number, y: number }, degree: number, translate: { x: number, y: number } }
    static isIdentity(matrix: UITransformMatrix): boolean
    static postScale(matrix: UITransformMatrix, x?: number, y?: number): UITransformMatrix
    static postTranslate(matrix: UITransformMatrix, x?: number, y?: number): UITransformMatrix
    static postRotate(matrix: UITransformMatrix, angle: number): UITransformMatrix
    static concat(preMatrix: UITransformMatrix, postMatrix: UITransformMatrix): UITransformMatrix
    isIdentity(): boolean
    postScale(x?: number, y?: number): UITransformMatrix
    postTranslate(x?: number, y?: number): UITransformMatrix
    postRotate(angle: number): UITransformMatrix
    concat(postMatrix: UITransformMatrix): UITransformMatrix
}

export class UIWindow extends UIView /* @available(0.1.1) */ {
    rootViewController?: UIViewController
    firstResponder?: UIView
    makeKeyAndVisible(): void
    endEditing(): void
}

export enum UIKeyboardAvoidingMode /* @available(0.1.1) */ {
    None,
    Pan,
}

export enum UIViewControllerLayoutOptions /* @available(0.1.1) */ {
    None,
    AndroidLight,
    AndroidDark,
}

export class UIViewController extends XT.BaseObject /* @available(0.1.1) */ {
    title: string
    readonly view: UIView
    layoutOptions: UIViewControllerLayoutOptions[]
    readonly safeAreaInsets: UIInsets
    loadView(): void
    viewDidLoad(): void
    viewWillAppear(): void
    viewDidAppear(): void
    viewWillDisappear(): void
    viewDidDisappear(): void
    viewWillLayoutSubviews(): void
    viewDidLayoutSubviews(): void
    readonly parentViewController?: UIViewController
    childViewControllers: UIViewController[]
    addChildViewController(childController: UIViewController): void
    removeFromParentViewController(): void
    willMoveToParentViewController(parent?: UIViewController): void
    didMoveToParentViewController(parent?: UIViewController): void
    presentViewController(viewController: UIViewController, animated?: boolean): void
    dismissViewController(animated?: boolean): void
    keyboardAvoidingMode(): UIKeyboardAvoidingMode
    keyboardWillShow(frame: UIRect, duration: number): void
    keyboardWillHide(duration: number): void
    supportOrientations: UIDeviceOrientation[]
    readonly navigationController?: UINavigationController
    readonly navigationBar: UINavigationBar
    showNavigationBar(animated?: boolean): void
    hideNavigationBar(animated?: boolean): void
}

export class UINavigationBarButtonItem /* @available(0.1.1) */ {
    image?: UIImage
    title?: string
    customView?: UIView
    onTouchUpInside?: () => void
}

export class UINavigationBar extends UIView /* @available(0.1.1) */ {
    title: string
    translucent: boolean
    lightContent: boolean
    setLeftBarButtonItem(navigationItem?: UINavigationBarButtonItem): void
    setLeftBarButtonItems(navigationItems: UINavigationBarButtonItem[]): void
    setRightBarButtonItem(navigationItem?: UINavigationBarButtonItem): void
    setRightBarButtonItems(navigationItems: UINavigationBarButtonItem[]): void
}

export class UINavigationController extends UIViewController /* @available(0.1.1) */ {
    constructor(rootViewController?: UIViewController)
    pushViewController(viewController: UIViewController, animated?: boolean): void
    popViewController(animated?: boolean): UIViewController | undefined
    popToViewController(viewController: UIViewController, animated?: boolean): UIViewController[]
    popToRootViewController(animated?: boolean): UIViewController[]
}

export class UICanvasView extends UIView /* @available(0.1.1) */ {
    globalAlpha: number
    fillStyle: UIColor
    strokeStyle: UIColor
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

export enum UIDeviceOrientation /* @available(0.1.1) */ {
    Unknown = 0,
    Portrait = 1,
    PortraitUpsideDown = 2,
    LandscapeLeft = 3,
    LandscapeRight = 4,
    FaceUp = 5,
    FaceDown = 6,
}

export class UIDevice /* @available(0.1.1) */ {
    static current: UIDevice
    name: string
    systemName: string
    systemVersion: string
    model: string
}

export enum UITextFieldViewMode /* @available(0.1.1) */ {
    Never,
    WhileEditing,
    UnlessEditing,
    Always,
}

export enum UIKeyboardType /* @available(0.1.1) */ {
    Default = 0,
    ASCIICapable = 1,
    NumbersAndPunctuation = 2,
}

export enum UIReturnKeyType /* @available(0.1.1) */ {
    Default = 0,
    Go = 1,
    Next = 4,
    Search = 6,
    Send = 7,
    Done = 9,
}

export class UITextField extends UIView /* @available(0.1.1) */ {
    text: string;
    font: UIFont;
    textColor: UIColor
    textAlignment: UITextAlignment
    placeholder: string;
    placeholderColor: UIColor
    clearsOnBeginEditing: Boolean
    readonly editing: Boolean
    clearButtonMode: UITextFieldViewMode
    leftView?: UIView
    leftViewMode: UITextFieldViewMode
    rightView?: UIView
    rightViewMode: UITextFieldViewMode
    // TextInput
    allowAutocapitalization: Boolean
    allowAutocorrection: Boolean
    allowSpellChecking: Boolean
    keyboardType: UIKeyboardType
    returnKeyType: UIReturnKeyType
    enablesReturnKeyAutomatically: Boolean
    secureTextEntry: Boolean
    // UITextField Delegate
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

export class UITextView extends UIView /* @available(0.1.1) */ {
    text: string;
    font: UIFont;
    textColor: UIColor
    textAlignment: UITextAlignment
    readonly editing: Boolean
    // TextInput
    allowAutocapitalization: Boolean
    allowAutocorrection: Boolean
    allowSpellChecking: Boolean
    keyboardType: UIKeyboardType
    returnKeyType: UIReturnKeyType
    enablesReturnKeyAutomatically: Boolean
    secureTextEntry: Boolean
    // UITextField Delegate
    shouldBeginEditing?: () => Boolean
    didBeginEditing?: () => void
    shouldEndEditing?: () => Boolean
    didEndEditing?: () => void
    shouldChange?: (inRange: { location: number, length: number }, replacementString: string) => Boolean
    // methods
    focus(): void
    blur(): void
}

export interface UITextMeasureParams /* @available(0.1.1) */ {
    font: UIFont;
    inRect: UIRect;
    numberOfLines?: number
    letterSpace?: number
    lineSpace?: number
}

export class UITextMeasurer /* @available(0.1.1) */ {
    static measureText(text: string, params: UITextMeasureParams): UIRect
}

export enum UIHRViewPosition /* @available(0.1.1) */ {
    Top,
    Middle,
    Bottom,
    Left,
    VMiddle,
    Right,
}

export class UIHRView extends UIView /* @available(0.1.1) */ {
    position: UIHRViewPosition
    color: UIColor
}

export class UIAlert /* @available(0.1.1) */ {
    buttonTitle: string
    constructor(message: string)
    show(callback?: () => void): void
}

export class UIConfirm /* @available(0.1.1) */ {
    confirmTitle: string
    cancelTitle: string
    constructor(message: string)
    show(resolve: () => void, reject: () => void): void
}

export class UIPrompt /* @available(0.1.1) */ {
    placeholder: string
    defaultValue: string
    confirmTitle: string
    cancelTitle: string
    constructor(message: string)
    show(resolve: (value: string) => void, reject: () => void): void
}

export class UIWebView extends UIView /* @available(0.1.1) */ {
    load(URLString: string): void
    onStart?: () => void
    onFinish?: () => void
    onFail?: (error: Error) => void
}

export class UISwitch extends UIView /* @available(0.1.1) */ {
    on: boolean
    onValueChanged?: (sender: this) => void
    setOn(value: boolean, animated: boolean): void
}

export class UISlider extends UIView /* @available(0.1.1) */ {
    value: number
    onValueChanged?: (sender: this) => void
    setValue(value: number, animated: boolean): void
}

export enum UIActivityIndicatorViewStyle /* @available(0.1.1) */ {
    Regular,
    Large,
}

export class UIActivityIndicatorView extends UIView /* @available(0.1.1) */ {
    style: UIActivityIndicatorViewStyle
    readonly animating: boolean
    hidesWhenStopped: boolean
    startAnimating(delay?: number): void
    stopAnimating(): void
}

export class UIExtView extends UIView {
    static className: string
    defineFunction(prop: string): any
    defineProperty(prop: string, defaultValue?: any): any
}

export interface UICollectionItem {

    [key: string]: any,
    reuseIdentifier: string
    itemSize: (width: number, height: number) => UISize

}

export class UICollectionEntity implements UICollectionItem {

    [key: string]: any;
    reuseIdentifier: string;
    itemSize: (width: number, height: number) => UISize;

}

export class UICollectionCell extends UIView {

    readonly reuseIdentifier: string
    readonly currentItem?: UICollectionItem
    readonly contentView: UIView
    didHighlighted(highlighted: boolean): void
    didSelected(): void
    didRender(): void

}

export class UICollectionSection {

    public headerView?: UIView
    public footerView?: UIView
    public items: UICollectionItem[]

}

export enum UICollectionViewScrollDirection {
    Vertical,
    Horizontal,
}

export class UICollectionView extends UIScrollView {

    refreshControl?: UIRefreshControl
    loadMoreControl?: UILoadMoreControl
    scrollDirection: UICollectionViewScrollDirection
    items: (UICollectionItem | UICollectionSection)[]
    register(clazz: typeof UICollectionCell, reuseIdentifier: string): void
    sectionInsets: UIInsets
    lineSpacing: number
    itemSpacing: number
    reloadData(): void

}

export as namespace NS;

export class NSData extends XT.BaseObject /* @available(0.1.1) */ {
    static initWithString(value: string): NSData
    static initWithBytes(bytes: Uint8Array): NSData
    static initWithData(data: NSData): NSData
    static initWithBase64EncodedString(string: string): NSData | undefined
    static initWithBase64EncodedData(data: NSData): NSData | undefined
    protected constructor()
    isEqualTo(data: NSData): boolean
    length(): number
    getBytes(): Uint8Array
    base64EncodedString(): string
    base64EncodedData(): NSData
    utf8String(): string | undefined
    md5(): string
    sha1(): string
}

export class NSFileManager /* @available(0.1.1) */ {
    static document: NSFileManager
    static cache: NSFileManager
    static tmp: NSFileManager
    static sdcard: NSFileManager
    protected constructor()
    writeData(data: NSData, path: string): boolean
    readData(path: string): NSData | undefined
    isFileExist(path: string): boolean
    deleteFile(path: string): boolean
    list(path: string): string[]
}

export class NSNotification /* @available(0.1.1) */ {
    readonly name: string
    readonly object: any
    readonly userInfo: { [key: string]: any }
}

export class NSNotificationCenter /* @available(0.1.1) */ {
    static default: NSNotificationCenter
    protected constructor()
    addObserver(name: string, triggerBlock: (notification: NSNotification) => void): string
    removeObserver(handler: string): void
    postNotification(name: string, object: any, userInfo: { [key: string]: any }): void
}

export enum NSURLCachePolily /* @available(0.1.1) */ {
    UseProtocolCachePolicy = 0,
    ReloadIgnoringLocalCacheData = 1,
    ReturnCacheDataElseLoad = 2,
    ReturnCacheDataDontLoad = 3,
}

export class NSURLRequest extends XT.BaseObject /* @available(0.1.1) */ {
    readonly url: string
    readonly timeout: number
    readonly cachePolicy: NSURLCachePolily
    constructor(url: string, timeout?: number, cachePolicy?: NSURLCachePolily)
    setHTTPMethod(value: "GET" | "POST" | "PUT" | "DELETE"): void
    setHTTPHeader(value: string, key: string): void
    setHTTPBody(value: string | NSData): void
}

export class NSURLResponse /* @available(0.1.1) */ {
    expectedContentLength: number
    suggestedFilename?: string
    mimeType?: string
    textEncodingName?: string
    url?: string
    allHeaderFields: { [key: string]: any }
    statusCode: number
}

export class NSURLSession /* @available(0.1.1) */ {
    static sharedSession: NSURLSession
    dataTaskWithURL(url: string, completionHandler: (data?: NSData, response?: NSURLResponse, error?: Error) => void): NSURLSessionTask
    dataTaskWithRequest(req: NSURLRequest, completionHandler: (data?: NSData, response?: NSURLResponse, error?: Error) => void): NSURLSessionTask
}

export class NSURLSessionTask extends XT.BaseObject /* @available(0.1.1) */ {
    cancel(): void
    resume(): void
}

export class NSUserDefaults /* @available(0.1.1) */ {
    static standard: NSUserDefaults
    constructor(suite: string | undefined)
    set(object: any, forKey: string): void
    get(forKey: string): any
}

export class NSWebSocket extends XT.BaseObject /* @available(0.1.1) */ {
    constructor(url: string)
    onOpen?: () => void
    onClose?: (code: number, reason: string) => void
    onFail?: (error: Error) => void
    onMessage?: (message: NSData | string) => void
    sendData(data: NSData): void
    sendString(string: string): void
    close(): void
}

export class NSDatabase extends XT.BaseObject /* @available(0.3.0) */ {

    constructor(name: string, location?: "document" | "cache" | "tmp")

    open(): Promise<boolean>
    executeQuery(sql: string, ...values: any[]): Promise<{ [key: string]: any }[]>
    executeUpdate(sql: string, ...values: any[]): Promise<boolean>
    executeStatements(sql: string): Promise<boolean>
    executeTransaction(exec: () => void, rollback: boolean): Promise<boolean>
    destory(): Promise<boolean>

}

declare global {
    // @ts-ignore
    var require: (path: string) => any;
    const XT: {
        minSDK: typeof minSDK,
        currentSDK: typeof currentSDK,
        platform: typeof platform,
        BaseObject: typeof XTBaseObject,
        BaseArray: typeof XTBaseArray,
        ClassType: typeof XTClassType,
        ClassLoader: typeof XTClassLoader,
        ExtObject: typeof XTExtObject,
        Debug: typeof XTDebug,
    }
    const UI: {
        InteractionState: typeof UIInteractionState,
        SwipeDirection: typeof UISwipeDirection,
        Context: typeof UIContext,
        View: typeof UIView,
        Color: typeof UIColor,
        Point: UIPoint,
        PointMake: (x: number, y: number) => UIPoint,
        PointEqual: (point1: UIPoint, point2: UIPoint) => boolean,
        PointZero: UIPoint,
        Size: UISize,
        SizeMake: (width: number, height: number) => UISize,
        SizeEqual: (size1: UISize, size2: UISize) => boolean,
        SizeZero: UISize,
        Rect: UIRect,
        RectMake: (x: number, y: number, width: number, height: number) => UIRect,
        RectZero: UIRect,
        RectEqual: (rect1: UIRect, rect2: UIRect) => boolean,
        RectInside: (rect1: UIRect, rect2: UIRect) => boolean,
        Insets: UIInsets,
        InsetsMake: (top: number, left: number, bottom: number, right: number) => UIInsets,
        LayoutAttribute: typeof UILayoutAttribute,
        LayoutRelation: typeof UILayoutRelation,
        LayoutConstraint: typeof UILayoutConstraint,
        ApplicationDelegate: typeof UIApplicationDelegate,
        Application: typeof UIApplication,
        Button: typeof UIButton,
        Font: typeof UIFont,
        ImageRenderingMode: typeof UIImageRenderingMode,
        Image: typeof UIImage,
        ContentMode: typeof UIContentMode,
        ImageView: typeof UIImageView,
        TextAlignment: typeof UITextAlignment,
        TextVerticalAlignment: typeof UITextVerticalAlignment,
        LineBreakMode: typeof UILineBreakMode,
        Label: typeof UILabel,
        RefreshControl: typeof UIRefreshControl,
        LoadMoreControl: typeof UILoadMoreControl,
        ListItem: UIListItem,
        ListSection: typeof UIListSection,
        ListEntity: typeof UIListEntity,
        ListSelectionStyle: typeof UIListSelectionStyle,
        ListCell: typeof UIListCell,
        ListView: typeof UIListView,
        Screen: typeof UIScreen,
        ScrollView: typeof UIScrollView,
        TransformMatrix: typeof UITransformMatrix,
        Window: typeof UIWindow,
        KeyboardAvoidingMode: typeof UIKeyboardAvoidingMode,
        ViewControllerLayoutOptions: typeof UIViewControllerLayoutOptions,
        ViewController: typeof UIViewController,
        NavigationBarButtonItem: typeof UINavigationBarButtonItem,
        NavigationBar: typeof UINavigationBar,
        NavigationController: typeof UINavigationController,
        CanvasView: typeof UICanvasView,
        DeviceOrientation: typeof UIDeviceOrientation,
        Device: typeof UIDevice,
        TextFieldViewMode: typeof UITextFieldViewMode,
        KeyboardType: typeof UIKeyboardType,
        ReturnKeyType: typeof UIReturnKeyType,
        TextField: typeof UITextField,
        TextView: typeof UITextView,
        TextMeasureParams: UITextMeasureParams,
        TextMeasurer: typeof UITextMeasurer,
        HRView: typeof UIHRView,
        Alert: typeof UIAlert,
        Confirm: typeof UIConfirm,
        Prompt: typeof UIPrompt,
        WebView: typeof UIWebView,
        Switch: typeof UISwitch,
        Slider: typeof UISlider,
        ActivityIndicatorViewStyle: typeof UIActivityIndicatorViewStyle,
        ActivityIndicatorView: typeof UIActivityIndicatorView,
        ExtView: typeof UIExtView,
        CollectionItem: UICollectionItem,
        CollectionEntity: typeof UICollectionEntity,
        CollectionCell: typeof UICollectionCell,
        CollectionSection: typeof UICollectionSection,
        CollectionViewScrollDirection: typeof UICollectionViewScrollDirection,
        CollectionView: typeof UICollectionView,
    };
    const NS: {
        Data: typeof NSData,
        FileManager: typeof NSFileManager,
        Notification: typeof NSNotification,
        NotificationCenter: typeof NSNotificationCenter,
        URLCachePolily: typeof NSURLCachePolily,
        URLRequest: typeof NSURLRequest,
        URLResponse: typeof NSURLResponse,
        URLSession: typeof NSURLSession,
        URLSessionTask: typeof NSURLSessionTask,
        UserDefaults: typeof NSUserDefaults,
        WebSocket: typeof NSWebSocket,
        Database: typeof NSDatabase,
    }
}