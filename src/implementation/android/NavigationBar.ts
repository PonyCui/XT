import { View } from './View'
import { Font } from './Font'
import { Image, ImageRenderingMode } from './ImageView'
import { Label, TextAlignment } from './Label';
import { Color } from '../../interface/Color';
import { Button } from './Button';
import { RectMake } from '../../interface/Rect';

export class NavigationBarButtonItem {

    title?: string
    customView: View
    onTouchUpInside?: () => void

    constructor() {
        this.customView = new Button()
        this.customView.frame = RectMake(0, 0, 44, 44);
        (this.customView as Button).onTouchUpInside = () => {
            if (this.onTouchUpInside) {
                this.onTouchUpInside()
            }
        }
    }

    private _image: Image | undefined

    public get image(): Image | undefined {
        return this._image;
    }

    public set image(value: Image | undefined) {
        this._image = value;
        if (this.customView instanceof Button) {
            this.customView.image = value
        }
    }

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
        super(ref || _XTUINavigationBar)
        if (ref === undefined) {
            this.setupContents()
            this.tintColor = Color.blackColor
        }
    }

    private _leftItems: View[] = []
    private _rightItems: View[] = []

    reload() {
        if (this.delegate) {
            this.contentView.subviews.forEach(it => {
                it.removeFromSuperview()
            })
            this._leftItems = (this.leftButtonItems || []).map(it => {
                return it.customView
            })
            this._rightItems = (this.rightButtonItems || []).map(it => {
                return it.customView
            })
            if (this.delegate.shouldShowBackButton() && this._leftItems.length == 0) {
                this._leftItems.push(this.backButton)
            }
            this._leftItems.forEach(it => { this.contentView.addSubview(it) })
            this._rightItems.forEach(it => { this.contentView.addSubview(it) })
            this.contentView.addSubview(this.titleView)
            this.layoutSubviews()
        }
    }

    setupContents() {
        this.contentView = new View()
        this.setupBackButton()
        this.setupTitleView()
        this.addSubview(this.contentView)
        this.reload()
    }

    setupBackButton() {
        this.backButton = new Button()
        this.backButton.frame = RectMake(0, 0, 44, 48)
        this.backButton.image = Image.fromBase64("iVBORw0KGgoAAAANSUhEUgAAADkAAAA8CAMAAADrC+IEAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABOUExURUdwTP///////////////////////////////////////////////////////////////////////////////////////////////////4il91oAAAAZdFJOUwD+ZRPxOKUhoAPR0BY3pxSZmAIOMyhEh7SA0BQ9AAAAfElEQVRIx+3VSQqAMBAF0XaIGudZ+/4XVaMLCQjxo4LQtX/rIrpO14qgdMShAiFD1ECEHnClPQg5CwQ+D1OBAv8Cq68hz4ljnQXdy1FoZMOoLEJUYtRIiO7yRKfYsZYs6vl3z6WEChUq1JGOKC01YRSAO4XgRkFINKDwrRZIeEfaMx4tYAAAAABJRU5ErkJggg==", 3.0)
        if (this.backButton.image) {
            this.backButton.image = this.backButton.image.imageWithImageRenderingMode(ImageRenderingMode.Template)
        }
        this.backButton.onTouchUpInside = () => {
            this.delegate && this.delegate.onBack()
        }
    }

    setupTitleView() {
        this.titleView = new Label()
        this.titleView.numberOfLines = 1
        this.titleView.font = Font.boldSystemFontOfSize(17)
        this.titleView.textColor = Color.blackColor
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.contentView.frame = RectMake(0, this.bounds.height - 48, this.bounds.width, 48)
        let currentX = this._leftItems.length > 0 ? 4.0 : 15.0
        let currentWidthLefted = this.contentView.bounds.width - currentX
        this._leftItems.forEach(it => {
            it.frame = RectMake(currentX, (this.contentView.bounds.height - it.frame.height) / 2.0, it.frame.width, it.frame.height)
            currentX += it.frame.width + 4.0
        })
        let currentRightX = this.contentView.bounds.width - 4.0
        this._rightItems.forEach(it => {
            it.frame = RectMake(currentRightX - it.frame.width, (this.contentView.bounds.height - it.frame.height) / 2.0, it.frame.width, it.frame.height)
            currentRightX -= it.frame.width + 4.0
        })
        currentWidthLefted = currentRightX - currentX
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
    //     return _XTUINavigationBar.xtr_translucent(this.objectRef)
    // }

    // public set translucent(value: boolean) {
    //     _XTUINavigationBar.xtr_setTranslucent(value, this.objectRef)
    // }

    private _lightContent: boolean = false

    public get lightContent(): boolean {
        return this._lightContent
    }

    public set lightContent(value: boolean) {
        this._lightContent = value
        this.tintColor = Color.whiteColor
    }

    private leftButtonItems: NavigationBarButtonItem[]

    public setLeftBarButtonItem(navigationItem?: NavigationBarButtonItem): void {
        if (navigationItem) {
            this.setLeftBarButtonItems([navigationItem])
        }
        else {
            this.setLeftBarButtonItems([]);
        }
    }

    public setLeftBarButtonItems(navigationItems: NavigationBarButtonItem[]): void {
        this.leftButtonItems = navigationItems
        this.reload()
    }

    public setRightBarButtonItem(navigationItem?: NavigationBarButtonItem): void {
        if (navigationItem) {
            this.setRightBarButtonItems([navigationItem])
        }
        else {
            this.setRightBarButtonItems([]);
        }
    }

    private rightButtonItems: NavigationBarButtonItem[]

    public setRightBarButtonItems(navigationItems: NavigationBarButtonItem[]): void {
        this.rightButtonItems = navigationItems
        this.reload()
    }

}