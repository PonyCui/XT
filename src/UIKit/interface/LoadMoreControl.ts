import { Color } from "./Color";
import { View } from "./View";

export class LoadMoreControl extends View {

    enabled: boolean
    color: Color
    readonly isLoading: boolean
    endLoading(): void { }
    onLoad?: () => void

}