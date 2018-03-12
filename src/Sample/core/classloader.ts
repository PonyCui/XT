import { TestBase, TestCase } from "./base";

class FooClass extends XT.ExtObject {

    constructor(objectRef: string | undefined = undefined) {
        super(objectRef, "FooClass")
    }

    static sayHello: () => string = FooClass.defineStaticFunction("FooClass", "sayHello")

    fooValue: string = this.defineProperty("fooValue", "Hello, World!")

    callYamiedie: (roleA: string, roleB: string) => string = this.defineFunction("callYamiedie")

}

export class ClassLoaderSample extends TestBase {

    viewDidLoad() {
        super.viewDidLoad()
        this.title = 'ClassLoader'
    }

    loadClassTests() {
        this.assert(FooClass.sayHello() === "Hello, World!")
        const fooObject = new FooClass()
        this.assert(fooObject.fooValue === "Hello, World!")
        fooObject.fooValue = "Don't say that."
        this.assert(fooObject.fooValue === "Don't say that.")
        this.assert(fooObject.callYamiedie("Mr.Boy", "Miss.Cang") === "Miss.Cang said: 'Mr.Boy Yamiedie'.")
    }

}