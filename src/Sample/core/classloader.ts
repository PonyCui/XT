import { TestBase, TestCase } from "./base";
require('./FooClass')

class FooClass extends XT.ExtObject {

    static className = "FooClass"

    static sayHello: () => string = FooClass.defineFunction("sayHello")

    fooValue: string = this.defineProperty("fooValue", "Hello, World!")

    callYamiedie: (roleA: string, roleB: string) => string = this.defineFunction("callYamiedie")

    nativeCalled = false

    handleNativeCall() {
        this.nativeCalled = true
    }

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
        this.assert(fooObject.nativeCalled === true)
    }

}