export class Alert {
    public buttonTitle: string
    constructor(readonly message: string) { }
    show(callback?: () => void): void { }
}

export class Confirm {
    public confirmTitle: string
    public cancelTitle: string
    constructor(readonly message: string) { }
    show(resolve: () => void, reject: () => void): void { }
}

export class Prompt {
    public placeholder: string
    public defaultValue: string
    public confirmTitle: string
    public cancelTitle: string
    constructor(readonly message: string) { }
    show(resolve: (value: string) => void, reject: () => void): void { }
}