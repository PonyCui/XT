import { View } from './View'
import { WebViewElement } from './element/WebView';

export class WebView extends View {

    onStart?: () => void
    onFinish?: () => void
    onFail?: (error: Error) => void

    nativeObject: any;

    constructor() {
        super(WebViewElement)
    }

    load(URLString: string): void {
        this.nativeObject.xtr_loadWithURLString(URLString)
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