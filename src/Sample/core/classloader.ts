import { TestBase, TestCase } from "./base";

declare var Foo: any;

export class ClassLoaderSample extends TestBase {

    viewDidLoad() {
        super.viewDidLoad()
        this.title = 'ClassLoader'
    }

    loadClassTests() {
        XT.ClassLoader.loadClass(XT.ClassType.ObjC, "FooClass", "Foo")
        XT.ClassLoader.loadClass(XT.ClassType.Java, "com.opensource.xtsample.FooClass", "Foo") 
        this.assert(Foo.sayHello() === "Hello, World!")
    }

}