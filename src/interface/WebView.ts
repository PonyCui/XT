import { View } from './View'

export class WebView extends View {

    load(URLString: string): void { }
    onStart?: () => void
    onFinish?: () => void
    onFail?: (error: Error) => void

}