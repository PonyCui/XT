import { TestBase, TestCase } from "./base";

export class ARCSample extends TestBase {

    baseObject = new XT.BaseObject({
        xxx: new UI.ActivityIndicatorView()
    })

    viewDidLoad() {
        super.viewDidLoad()
        this.title = 'Auto Release Count'
    }

    arcTests(_: TestCase) {
        _.isAsync = true
        const data = NS.Data.initWithString("Hello, World!")
        this.data = data
        setTimeout(() => {
            this.assert(data.base64EncodedString() === "SGVsbG8sIFdvcmxkIQ==")
            _.asyncResolover()
        }, 3000)
    }

    releaseTests(_: TestCase) {
        _.isAsync = true
        const data2 = NS.Data.initWithString("Hello, World!")
        this.data2 = data2
        setTimeout(() => {
            this.data2 = undefined
        }, 1500)
        setTimeout(() => {
            try {
                this.assert(data2.base64EncodedString() === "SGVsbG8sIFdvcmxkIQ==")
            } catch (error) {
                _.asyncResolover()
            }
        }, 3000)
    }

}