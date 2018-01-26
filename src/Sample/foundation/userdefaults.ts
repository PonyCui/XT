import { TestBase, TestCase } from "./base";

export class UserDefaultsSample extends TestBase {

    viewDidLoad() {
        super.viewDidLoad()
        this.title = 'UserDefaults'
    }

    stringValueTests() {
        NS.UserDefaults.standard.set("Hello, World!", "testKey")
        this.assert(NS.UserDefaults.standard.get("testKey") === "Hello, World!")
    }

    intValueTests() {
        NS.UserDefaults.standard.set(123, "testKey2")
        this.assert(NS.UserDefaults.standard.get("testKey2") === 123)
    }

    boolValueTests() {
        NS.UserDefaults.standard.set(true, "testKey3")
        this.assert(NS.UserDefaults.standard.get("testKey3") === true)
    }

    mapValueTests() {
        NS.UserDefaults.standard.set({ aKey: "aValue" }, "testKey4")
        this.assert(NS.UserDefaults.standard.get("testKey4")["aKey"] === "aValue")
    }

    arrayValueTests() {
        NS.UserDefaults.standard.set([1, 2, 3], "testKey5")
        this.assert(NS.UserDefaults.standard.get("testKey5")[0] === 1)
    }

}