import { View } from './View'

export class WebView extends View {

    onStart?: () => void
    onFinish?: () => void
    onFail?: (error: Error) => void

    constructor(ref: any) {
        super(ref || _XTUIWebView)
    }

    load(URLString: string): void {
        _XTUIWebView.xtr_loadWithURLString(URLString, this.objectRef)
    }

    handleStart() {
        this.onStart && this.onStart()
    }

    handleFinish() {
        this.onFinish && this.onFinish()
    }

    handleFail(message: string) {
        this.onFail && this.onFail(new Error(message))
    }

}