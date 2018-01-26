import { View } from './View'
import { ViewController } from "./ViewController";
import { Rect } from './Rect';

export class Window extends View {

    rootViewController?: ViewController
    firstResponder?: View
    makeKeyAndVisible(): void { }
    endEditing(): void { }

}