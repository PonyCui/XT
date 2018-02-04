import { View } from './View'
import { Image } from './ImageView';

export class NavigationBarButtonItem {

    image?: Image
    title?: string
    customView?: View
    onTouchUpInside?: () => void

}

export class NavigationBar extends View {

    private _title: string = ""

    public get title(): string {
        return this._title
    }

    public set title(value: string) {
        this._title = value
        document.title = value
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

    translucent: boolean
    lightContent: boolean
    setLeftBarButtonItem(navigationItem?: NavigationBarButtonItem): void { }
    setLeftBarButtonItems(navigationItems: NavigationBarButtonItem[]): void { }
    setRightBarButtonItem(navigationItem?: NavigationBarButtonItem): void { }
    setRightBarButtonItems(navigationItems: NavigationBarButtonItem[]): void { }

}