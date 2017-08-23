declare module 'xt' {

    enum InteractionState {
        Began,
        Changed,
        Ended,
        Cancelled,
    }

    enum SwipeDirection {
        ToLeft,
        ToRight,
        ToTop,
        ToBottom,
    }

    class View {
        constructor(rect?: Rect)
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
         * defaults to PointZero;
         */
        shadowOffset?: Point;
        /**
         * defaults to 0;
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
        longPressDuration: number;
        onTap?: () => void
        onDoubleTap?: () => void
        onLongPress?: (state: InteractionState, viewLocation?: Point, absLocation?: Point) => void
        onPan?: (state: InteractionState, viewLocation?: Point, absLocation?: Point) => void
        // Mark: View Animation
        animationWithDuration(duration: number, animations: () => void, completion?: () => void): void
        animationWithBouncinessAndSpeed(damping: number, velocity: number, animations: () => void, completion?: () => void): void
    }

    class Color {
        readonly r: number;
        readonly g: number;
        readonly b: number;
        readonly a: number;
        constructor(r: number, g: number, b: number, a?: number)
        rgbHexNumber(): number
        rgbHexString(): string
        equals(toColor: Color | undefined): boolean
    }

    interface Point {
        readonly x: number;
        readonly y: number;
    }

    function PointMake(x: number, y: number): Point
    function PointEqual(point1: Point, point2: Point): boolean
    const PointZero: Point

    interface Size {
        readonly width: number;
        readonly height: number;
    }

    function SizeMake(width: number, height: number): Size
    function SizeEqual(size1: Size, size2: Size): boolean
    const SizeZero: Size

    interface Rect {
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
    }

    function RectMake(x: number, y: number, width: number, height: number): Rect
    const RectZero: Rect
    function RectEqual(rect1: Rect, rect2: Rect): boolean
    function RectInside(rect1: Rect, rect2: Rect): boolean

    interface Insets {
        readonly top: number;
        readonly left: number;
        readonly bottom: number;
        readonly right: number;
    }

    function InsetsMake(top: number, left: number, bottom: number, right: number): Insets

    enum LayoutAttribute {
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

    enum LayoutRelation {
        Less = -1,
        Equal = 0,
        Greater = 1,
    }

    class LayoutConstraint {
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

    class ApplicationDelegate {
        window?: Window;
        applicationDidFinishLaunchingWithOptions(application: Application, launchOptions: Object): void
    }

    class Application {
        constructor(t: any, delegate: ApplicationDelegate)
        delegate: ApplicationDelegate
        keyWindow?: Window
        sharedApplication?(): Application
    }

    class Button extends View {
        readonly imageView: ImageView;
        readonly titleLabel: Label
        vertical: boolean;
        inset: number;
        title?: string
        color?: Color
        onHighlighted?: (highligted: boolean) => void
        onTouchUpInside?: () => void
    }

    class Font {
        readonly familyName?: string;
        readonly pointSize: number;
        readonly fontWeight: string;
        readonly fontStyle: string;
        constructor(pointSize: number, fontWeight?: string, fontStyle?: string, familyName?: string)
        static systemFontOfSize(pointSize: number, weight?: string): Font
        static boldSystemFontOfSize(pointSize: number): Font
        static italicSystemFontOfSize(pointSize: number): Font
    }

    enum ImageRenderingMode {
        Original,
        Template,
    }

    class Image {
        readonly size: Size;
        readonly scale: number;
        readonly renderingMode: ImageRenderingMode;
        static assetsPath: string
        static fromURL(url: string, success: (image: Image) => void, failure: (error: Error) => void): void
        static fromAssets(named: string, success: (image: Image) => void, failure: (error: Error) => void): void
        static fromAssetsWithScales(named: string, scales: number[] | number, success: (image: Image) => void, failure: (error: Error) => void): void
        imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image
    }

    enum ContentMode {
        ScaleToFill,
        ScaleAspectFit,
        ScaleAspectFill,
    }

    class ImageView extends View {
        image?: Image;
        contentMode: ContentMode;
    }

    enum TextAlignment {
        Left,
        Center,
        Right,
    }

    enum TextVerticalAlignment {
        Top,
        Center,
        Bottom,
    }

    enum LineBreakMode {
        WordWrapping = 0,
        TruncatingTail = 4,
    }

    class Label extends View {
        text?: string;
        font?: Font;
        textColor: Color
        textAlignment: TextAlignment
        numberOfLines: number
        lineBreakMode: LineBreakMode
        lineSpace: number
        textRectForBounds(bounds: Rect): Rect
    }

    interface ListItem {
        reuseIdentifier: string
        rowHeight: (width: number) => number
    }

    enum ListSelectionStyle {
        None,
        Gray,
    }

    class ListCell extends View {
        readonly reuseIdentifier: string
        readonly currentItem?: ListItem
        readonly contentView: View
        selectionStyle: ListSelectionStyle
    }

    class ListView extends ScrollView {

        items: ListItem[]
        renderItem?: (cell: ListCell, item: ListItem) => void
        register(clazz: typeof ListCell, reuseIdentifier: string): void
        reloadData(): void

    }

    class Screen {
        static mainScreen: () => Screen
        readonly width: number;
        readonly height: number;
        readonly scale: number;
        constructor(width: number, height: number, scale: number)
        bounds(): Rect
        static withScale(value: number): number
        static outScale(value: number): number
    }

    class ScrollView extends View {
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

    class TransformMatrix {
        readonly a: number;
        readonly b: number;
        readonly c: number;
        readonly d: number;
        readonly tx: number;
        readonly ty: number;
        constructor(a: number, b: number, c: number, d: number, tx: number, ty: number)
    }

    class Window extends View {
        makeKeyAndVisible(): void
    }

}