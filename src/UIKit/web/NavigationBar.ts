import { View } from './View'
import { Window } from './Window'
import { Image } from './ImageView';

export class NavigationBarButtonItem {

    image?: Image
    title?: string
    customView?: View
    onTouchUpInside?: () => void

}

export class NavigationBar extends Window {

    static resetNavigationBar?: (navigationBar: NavigationBar, viewController: any) => void = undefined

    static onResetNavigationBar(value: (navigationBar: NavigationBar) => void) {
        this.resetNavigationBar = value
    }
    
    constructor(readonly _viewController: any) { super() }

    private _show: boolean = false

    public get show(): boolean {
        return this._show;
    }

    public set show(value: boolean) {
        this._show = value;
        if (NavigationBar.resetNavigationBar) { NavigationBar.resetNavigationBar(this, this._viewController) }
    }

    private _title: string = ""

    public get title(): string {
        return this._title
    }

    public set title(value: string) {
        this._title = value
        document.title = value
        if (NavigationBar.resetNavigationBar) { NavigationBar.resetNavigationBar(this, this._viewController) }
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.NavigationBar",
            title: this.title,
            translucent: this.translucent,
            lightContent: this.lightContent,
        }
    }

    private _translucent: boolean = false

    public get translucent(): boolean {
        return this._translucent;
    }

    public set translucent(value: boolean) {
        this._translucent = value;
        if (NavigationBar.resetNavigationBar) { NavigationBar.resetNavigationBar(this, this._viewController) }
    }

    private _lightContent: boolean = false

    public get lightContent(): boolean {
        return this._lightContent;
    }

    public set lightContent(value: boolean) {
        this._lightContent = value;
        if (NavigationBar.resetNavigationBar) { NavigationBar.resetNavigationBar(this, this._viewController) }
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
        if (NavigationBar.resetNavigationBar) { NavigationBar.resetNavigationBar(this, this._viewController) }
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
        if (NavigationBar.resetNavigationBar) { NavigationBar.resetNavigationBar(this, this._viewController) }
    }

}