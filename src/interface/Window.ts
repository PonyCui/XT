import { View } from './View'
import { ViewController } from "./ViewController";

export class Window extends View {

    rootViewController?: ViewController
    makeKeyAndVisible(): void { }

}