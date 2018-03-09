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
                _.asyncRejector(Error("data2 not released."))
            } catch (error) {
                _.asyncResolover()
            }
        }, 3000)
    }

    baseObject2: any = new XT.BaseObject()

    circularReferenceTests(_: TestCase) {
        _.isAsync = true
        const innerObject = new XT.BaseObject().retain()
        this.baseObject2.innerObject = innerObject
        innerObject.weakBaseObject2 = this.baseObject2
        setTimeout(() => {
            this.baseObject2 = undefined
        }, 1500)
        setTimeout(() => {
            this.assert(innerObject.weakBaseObject2 === undefined)
            innerObject.release()
            _.asyncResolover()
        }, 3000)
    }

}