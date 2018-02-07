import { Debug as IDebug } from '../interface/Debug'

export class Debug extends IDebug {

    private static activeBreakpoints: { [key: string]: boolean } = {}
    private static stepping = false
    private static currentBpIdentifier: string = ""

    private static _worker: Worker | undefined = undefined
    private static _workerIP: string = window.location.hostname
    private static _workerPort: number = 8081

    static reloadHandler?: (source: string, force: boolean) => void = undefined

    static get worker(): Worker | undefined {
        return this._worker
    }

    static set worker(value: Worker | undefined) {
        this._worker = value
        localStorage.removeItem("__XT_DEBUG_LOCK__")
        if (value) {
            value.onmessage = (e) => {
                if (e.data.action === "reload") {
                    this.reloadHandler ? this.reloadHandler(e.data.source, e.data.force) : (e.data.force === true && window.location.reload(true))
                }
                else if (e.data.action === "clearBreakPoint") {
                    this.clearBreakpoint(e.data.bpIdentifier)
                }
                else if (e.data.action === "clearBreakPoints") {
                    this.clearBreakpoints(e.data.path)
                }
                else if (e.data.action === "setBreakPoint") {
                    this.setBreakpoint(e.data.bpIdentifier)
                }
            };
            this.setupLogger()
        }
    }

    static connect(IP: string = window.location.hostname, port: number = 8081) {
        if (this._worker) {
            this._workerIP = IP;
            this._workerPort = port;
            this._worker.postMessage({ type: "connect", IP, port })
        }
    }

    private static setupLogger() {
        {
            const originMethod = window.console.log
            window.console.log = function () {
                originMethod.apply(window.console, arguments)
                for (let index = 0; index < arguments.length; index++) {
                    let description = ""
                    try {
                        description = arguments[index].toString()
                    } catch (error) {
                        description = typeof arguments[index]
                    }
                    Debug._worker && Debug._worker.postMessage({
                        type: "log",
                        payload: description,
                    })
                }
            }
        }
        {
            const originMethod = window.console.error
            window.console.error = function () {
                originMethod.apply(window.console, arguments)
                for (let index = 0; index < arguments.length; index++) {
                    let description = ""
                    try {
                        description = arguments[index].toString()
                    } catch (error) {
                        description = typeof arguments[index]
                    }
                    Debug._worker && Debug._worker.postMessage({
                        type: "log",
                        payload: description,
                    })
                }
            }
        }
    }

    static run(id: string, t: any, s: any) {
        if (this._worker === undefined) { return }
        this.currentBpIdentifier = id
        if (this.stepping === true || this.activeBreakpoints[id] === true) {
            this.stepping = false
            let tJSON = "{}"
            try {
                tJSON = Debug.stringify(t)
            } catch (error) { }
            let sJSON = "{}"
            try {
                sJSON = Debug.stringify(s)
            } catch (error) { console.error(error); }
            try {
                const bpRequest = new XMLHttpRequest()
                bpRequest.open("POST", "http://" + this._workerIP + ":" + (this._workerPort + 1) + "/break", false)
                bpRequest.send(JSON.stringify({
                    bpIdentifier: id,
                    this: tJSON,
                    scope: sJSON,
                }))
                if (bpRequest.responseText === "break") {
                    while (true) {
                        const bpRequest = new XMLHttpRequest()
                        bpRequest.open("GET", "http://" + this._workerIP + ":" + (this._workerPort + 1) + "/status", false)
                        bpRequest.send()
                        if (bpRequest.responseText === "continue") { break }
                        if (bpRequest.responseText === "step") { this.stepping = true; break }
                    }
                }
            } catch (error) { }
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

    static eval(code: string): string {
        return eval(code) + ""
    }

}