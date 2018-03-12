class FooClass {

    static sayHello() {
        return "Hello, World!"
    }

    fooValue: string = ""

    callYamiedie(roleA: string, roleB: string) {
        return roleB + " said: '" + roleA + " Yamiedie'."
    }

}

if (typeof navigator === "object") {
    (window as any)["FooClass"] = FooClass
}