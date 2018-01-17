import { View } from './View'
import { Font } from './Font'
import { Image } from './ImageView'

export class NavigationBarButtonItem {

    image?: Image
    title?: string
    customView?: View
    onTouchUpInside?: () => void

}

export class NavigationBar extends View {

    constructor(ref?: any) {
        super(ref || XTRNavigationBar)
    }

    // public get title(): string {
    //     return XTRNavigationBar.xtr_title(this.objectRef)
    // }

    // public set title(value: string) {
    //     XTRNavigationBar.xtr_setTitle(value, this.objectRef)
    // }

    // public get translucent(): boolean {
    //     return XTRNavigationBar.xtr_translucent(this.objectRef)
    // }

    // public set translucent(value: boolean) {
    //     XTRNavigationBar.xtr_setTranslucent(value, this.objectRef)
    // }

    // public get lightContent(): boolean {
    //     return XTRNavigationBar.xtr_lightContent(this.objectRef)
    // }

    // public set lightContent(value: boolean) {
    //     XTRNavigationBar.xtr_setLightContent(value, this.objectRef)
    // }

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