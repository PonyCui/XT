import { View } from './View'
import { Font } from './Font'
import { Image, ImageRenderingMode } from './ImageView'
import { Label, TextAlignment } from './Label';
import { Color } from '../../interface/Color';
import { Button } from './Button';
import { RectMake } from '../../interface/Rect';

const backButtonData = "iVBORw0KGgoAAAANSUhEUgAAADkAAAA8CAMAAADrC+IEAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABOUExURUdwTP///////////////////////////////////////////////////////////////////////////////////////////////////4il91oAAAAZdFJOUwD+ZRPxOKUhoAPR0BY3pxSZmAIOMyhEh7SA0BQ9AAAAfElEQVRIx+3VSQqAMBAF0XaIGudZ+/4XVaMLCQjxo4LQtX/rIrpO14qgdMShAiFD1ECEHnClPQg5CwQ+D1OBAv8Cq68hz4ljnQXdy1FoZMOoLEJUYtRIiO7yRKfYsZYs6vl3z6WEChUq1JGOKC01YRSAO4XgRkFINKDwrRZIeEfaMx4tYAAAAABJRU5ErkJggg=="

export class NavigationBarButtonItem {

    image?: Image
    title?: string
    customView?: View
    onTouchUpInside?: () => void

}

export interface NavigationBarDelegate {
    onBack(): void
    shouldShowBackButton(): boolean
}

export class NavigationBar extends View {

    public delegate?: NavigationBarDelegate
    private contentView: View
    private backButton: Button
    private titleView: Label

    constructor(ref?: any) {
        super(ref || XTRNavigationBar)
        if (ref === undefined) {
            this.setupContents()
            this.tintColor = Color.blackColor
        }
    }

    reload() {
        if (this.delegate) {
            this.backButton.hidden = !this.delegate.shouldShowBackButton()
            this.layoutSubviews()
        }
    }

    setupContents() {
        this.contentView = new View()
        this.setupBackButton()
        this.setupTitleView()
        this.addSubview(this.contentView)
    }

    setupBackButton() {
        this.backButton = new Button()
        this.backButton.hidden = true
        this.backButton.frame = RectMake(0, 0, 44, 48)
        Image.fromBase64(backButtonData, 3.0, (it) => {
            this.backButton.image = it.imageWithImageRenderingMode(ImageRenderingMode.Template)
        })
        this.backButton.onTouchUpInside = () => {
            this.delegate && this.delegate.onBack()
        }
        this.contentView.addSubview(this.backButton)
    }

    setupTitleView() {
        this.titleView = new Label()
        this.titleView.numberOfLines = 1
        this.titleView.font = Font.boldSystemFontOfSize(17)
        this.titleView.textColor = Color.blackColor
        this.contentView.addSubview(this.titleView)
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.contentView.frame = RectMake(0, this.bounds.height - 48, this.bounds.width, 48)
        let leftItems: View[] = []
        let rightItems: View[] = []
        if (!this.backButton.hidden) {
            leftItems.push(this.backButton)
        }
        let currentX = leftItems.length > 0 ? 4.0 : 15.0
        let currentWidthLefted = this.contentView.bounds.width - currentX
        leftItems.forEach(it => {
            it.frame = RectMake(currentX, (this.contentView.bounds.height - it.frame.height) / 2.0, it.frame.width, it.frame.height)
            currentX += it.frame.width + 4.0
        })
        currentWidthLefted = this.contentView.bounds.width - currentX
        this.titleView.frame = RectMake(currentX, 0, currentWidthLefted, this.contentView.bounds.height)
    }

    tintColorDidChange() {
        this.contentView.tintColor = this.tintColor
        this.titleView.textColor = this.tintColor
    }

    public get title(): string {
        return this.titleView.text
    }

    public set title(value: string) {
        this.titleView.text = value
    }

    // public get translucent(): boolean {
    //     return XTRNavigationBar.xtr_translucent(this.objectRef)
    // }

    // public set translucent(value: boolean) {
    //     XTRNavigationBar.xtr_setTranslucent(value, this.objectRef)
    // }

    private _lightContent: boolean = false

    public get lightContent(): boolean {
        return this._lightContent
    }

    public set lightContent(value: boolean) {
        this._lightContent = value
        this.tintColor = XT.Color.whiteColor
    }

    // private leftButtonItemCallbacks: (() => void)[] = []

    // public setLeftBarButtonItem(navigationItem?: NavigationBarButtonItem): void {
    //     if (navigationItem) {
    //         this.setLeftBarButtonItems([navigationItem])
    //     }
    //     else {
    //         this.setLeftBarButtonItems([]);
    //     }
    // }

    // public setLeftBarButtonItems(navigationItems: NavigationBarButtonItem[]): void {
    //     this.leftButtonItemCallbacks = navigationItems.map(it => it.onTouchUpInside || (() => { }))
    //     XTRNavigationBar.xtr_setLeftBarButtonItemsObjectRef(navigationItems.map(it => {
    //         return {
    //             image: it.image ? it.image.objectRef : undefined,
    //             title: it.title,
    //             customView: it.customView ? it.customView.objectRef : undefined,
    //         }
    //     }), this.objectRef)
    // }

    // private handleLeftButtonTouchUpInside(idx: number) {
    //     if (this.leftButtonItemCallbacks[idx]) {
    //         this.leftButtonItemCallbacks[idx]()
    //     }
    // }

    // public setRightBarButtonItem(navigationItem?: NavigationBarButtonItem): void {
    //     if (navigationItem) {
    //         this.setRightBarButtonItems([navigationItem])
    //     }
    //     else {
    //         this.setRightBarButtonItems([]);
    //     }
    // }

    // private rightButtonItemCallbacks: (() => void)[] = []

    // public setRightBarButtonItems(navigationItems: NavigationBarButtonItem[]): void {
    //     this.rightButtonItemCallbacks = navigationItems.map(it => it.onTouchUpInside || (() => { }))
    //     XTRNavigationBar.xtr_setRightBarButtonItemsObjectRef(navigationItems.map(it => {
    //         return {
    //             image: it.image ? it.image.objectRef : undefined,
    //             title: it.title,
    //             customView: it.customView ? it.customView.objectRef : undefined,
    //         }
    //     }), this.objectRef)
    // }

    // private handleRightButtonTouchUpInside(idx: number) {
    //     if (this.rightButtonItemCallbacks[idx]) {
    //         this.rightButtonItemCallbacks[idx]()
    //     }
    // }

}