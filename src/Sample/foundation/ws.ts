import { TestBase, TestCase } from "./base";

export class WSSample extends TestBase {

    socket: NS.WebSocket

    viewDidLoad() {
        super.viewDidLoad()
        this.title = 'WebSocket'
    }

    connectTests(_: TestCase) {
        _.isAsync = true
        var connected = false
        var send_and_received = false
        this.socket = new NS.WebSocket("ws://echo.websocket.org").retain()
        this.socket.onOpen = () => {
            connected = true
            this.socket.sendString("Hello, World!");
        }
        this.socket.onMessage = (msg) => {
            if (msg === "Hello, World!") {
                send_and_received = true
                this.socket.close()
            }
        }
        setTimeout(() => {
            this.assert(connected && send_and_received, "", _)
            _.asyncResolover()
        }, 2000)
    }

}