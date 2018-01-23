import { View } from "./View";

export class Slider extends View {

    value: number
    onValueChanged?: () => void
    setValue(value: number, animated: boolean) { }

}