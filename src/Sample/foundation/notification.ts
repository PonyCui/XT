import { TestBase, TestCase } from "./base";

export class NotificationSample extends TestBase {

    private noteHandler: string | undefined = undefined
    private receivedNote: NS.Notification | undefined = undefined

    viewDidLoad() {
        super.viewDidLoad()
        this.title = 'UserDefaults'
    }

    postTests(_: TestCase) {
        _.isAsync = true
        this.receivedNote = undefined
        this.noteHandler = NS.NotificationCenter.default.addObserver("Test", (note) => {
            this.receivedNote = note
        })
        NS.NotificationCenter.default.postNotification("Test", "Hello, World!", { aKey: "aValue" });
        setTimeout(() => {
            this.assert(this.receivedNote instanceof NS.Notification &&
                this.receivedNote.object === "Hello, World!" &&
                this.receivedNote.userInfo.aKey === "aValue", "", _);
            _.asyncResolover()
        }, 100)
    }

    removeTests(_: TestCase) {
        _.isAsync = true
        this.receivedNote = undefined
        this.noteHandler = NS.NotificationCenter.default.addObserver("Test", (note) => {
            this.receivedNote = note
        })
        NS.NotificationCenter.default.removeObserver(this.noteHandler)
        NS.NotificationCenter.default.postNotification("Test", "Hello, World!", { aKey: "aValue" });
        setTimeout(() => {
            this.assert(!(this.receivedNote instanceof NS.Notification), "", _)
            _.asyncResolover()
        }, 100)
    }

}