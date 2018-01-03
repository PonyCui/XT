import { View } from './View'
import { Font } from './Font'
import { Image } from './ImageView';

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
    setLeftBarButtonItem(navigationItem?: NavigationBarButtonItem): void { }
    setLeftBarButtonItems(navigationItems: NavigationBarButtonItem[]): void { }
    setRightBarButtonItem(navigationItem?: NavigationBarButtonItem): void { }
    setRightBarButtonItems(navigationItems: NavigationBarButtonItem[]): void { }

}