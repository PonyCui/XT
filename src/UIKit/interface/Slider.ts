import { View } from "./View";

export class Slider extends View {

    value: number
    onValueChanged?: (sender: this) => void
    setValue(value: number, animated: boolean) { }

}