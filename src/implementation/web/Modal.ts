
export class Alert {

    public buttonTitle: string = "好的"

    constructor(readonly message: string) { }

    show(callback?: () => void): void {
        window.alert(this.message)
        if (callback) {
            callback()
        }
    }

}

export class Confirm {

    public confirmTitle: string = "确认"
    public cancelTitle: string = "取消"

    constructor(readonly message: string) { }

    show(resolve: () => void, reject: () => void): void {
        if (window.confirm(this.message)) {
            resolve()
        }
        else {
            reject()
        }
    }

}

export class Prompt {

    public placeholder: string

    public defaultValue: string

    public confirmTitle: string = "确认"

    public cancelTitle: string = "取消"

    constructor(readonly message: string) { }

    show(resolve: (value: string) => void, reject: () => void): void {
        const value = window.prompt(this.message, this.defaultValue)
        if (typeof value === "string") {
            resolve(value)
        }
        else {
            reject()
        }
    }

}