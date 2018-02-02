import { Debug as IDebug } from '../interface/Debug'

export class Debug extends IDebug {

    private static activeBreakpoints: { [key: string]: boolean } = {}
    private static stepping = false

    static run(id: string, t: any, s: any) {
        if (this.stepping === true || this.activeBreakpoints[id] === true) {
            this.stepping = false
            let tJSON = "{}"
            try {
                tJSON = JSON.stringify(t)
            } catch (error) { }
            let sJSON = "{}"
            try {
                sJSON = JSON.stringify(s)
            } catch (error) { }
            _XTDebug.xtr_break(id, tJSON, sJSON)
            this.stepping = _XTDebug.xtr_stepping()
        }
    }

    static clearBreakpoint(id: string) {
        delete this.activeBreakpoints[id]
    }

    static clearBreakpoints(path: string) {
        Object.keys(this.activeBreakpoints).forEach(it => {
            if (it.indexOf(path) === 0) {
                delete this.activeBreakpoints[it]
            }
        })
    }

    static setBreakpoint(id: string) {
        this.activeBreakpoints[id] = true
    }

}

(window as any).XTDebug = Debug