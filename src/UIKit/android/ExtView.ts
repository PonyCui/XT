import { View } from "./View";

export class ExtView extends View {

    private static _className: string

    public static get className(): string {
        return this._className;
    }

    public static set className(value: string) {
        this._className = value;
        this.register()
    }

    constructor(ref?: any) {
        super(ref || _XTUIExtView)
        if (ref === undefined) {
            _XTUIExtView.xtr_initWithViewClass((this.constructor as any).className, this.objectRef)
        }
    }

    static register(): void {
        (ExtView as any)[this.className] = this
    }

    defineFunction(prop: string): any {
        return function () {
            var args = []
            for (let index = 0; index < arguments.length; index++) {
                args.push(arguments[index])
            }
            return _XTUIExtView.xtr_callMethod(prop, args, this.objectRef)
        }
    }

    defineProperty(prop: string, defaultValue: any = undefined): any {
        Object.defineProperty(this, prop, {
            get: () => {
                return _XTUIExtView.xtr_getValue(prop, this.objectRef)
            },
            set: (newValue) => {
                _XTUIExtView.xtr_setValue(newValue, prop, this.objectRef)
            },
        })
        return defaultValue
    }

}