class XTDebugger {

    static sharedDebugger = new XTDebugger()
    socket: WebSocket | undefined = undefined
    openTS: number = 0

    connect(IP: string, port: number) {
        if (this.socket) {
            this.socket.close()
        }
        this.socket = new WebSocket('ws://' + IP + ":" + port + "/")
        this.socket.onopen = () => {
            this.openTS = this.openTS == 0 ? performance.now() : this.openTS
            if (this.socket) {
                this.socket.send("Hello, World!")
            }
        }
        this.socket.onmessage = ((ev: MessageEvent) => {
            try {
                var obj = JSON.parse(ev.data)
                if (obj.action === "reload") {
                    this.handleReload()
                }
                else if (obj.action === "clearBreakPoint") {
                    this.handleClearBreakPoint(obj);
                }
                else if (obj.action === "clearBreakPoints") {
                    this.handleClearBreakPoints(obj);
                }
                else if (obj.action === "setBreakPoint") {
                    this.handleSetBreakPoint(obj);
                }
                // else if ([obj[@"action"] isEqualToString:@"eval"]) {
                //     [self handleEval:obj];
                // }
            } catch (error) { }
        }) as any
        this.socket.onclose = () => {
            setTimeout(() => {
                this.connect(IP, port)
            }, 1000)
        }
        this.socket.onerror = () => {
            setTimeout(() => {
                this.connect(IP, port)
            }, 1000)
        }
    }

    handleReload() {
        if (performance.now() - this.openTS < 2000) { return }
        (postMessage as any)({ action: "reload" })
    }

    handleClearBreakPoint(obj: any) {
        (postMessage as any)({ action: "clearBreakPoint", bpIdentifier: obj["path"] + ":" + obj["line"] })
    }

    handleClearBreakPoints(obj: any) {
        (postMessage as any)({ action: "clearBreakPoints", path: obj["path"] })
    }

    handleSetBreakPoint(obj: any) {
        (postMessage as any)({ action: "setBreakPoint", bpIdentifier: obj["path"] + ":" + obj["line"] })
    }

    sendLog(value: string) {
        if (this.socket) {
            this.socket.send(JSON.stringify({
                type: "console.log",
                payload: btoa(value),
                bpIdentifier: "console",
            }))
        }
    }

}

onmessage = function (event: MessageEvent) {
    if (event.data) {
        if (event.data["type"] === "connect") {
            XTDebugger.sharedDebugger.connect(event.data["IP"], event.data["port"])
        }
        else if (event.data["type"] === "log") {
            XTDebugger.sharedDebugger.sendLog(event.data["payload"]);
        }
    }
}