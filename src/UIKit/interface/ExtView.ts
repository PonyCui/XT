import { View } from "./View";

export class ExtView extends View {

    static className: string
    defineFunction(prop: string): any { }
    defineProperty(prop: string, defaultValue: any = undefined): any { }

}