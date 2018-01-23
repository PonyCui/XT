import { View } from "./View";

export class Switch extends View {

    on: boolean = false
    onValueChanged?: () => void
    setOn(value: boolean, animated: boolean) { }

}