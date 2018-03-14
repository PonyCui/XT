if (XT.platform === "Web") {

    (window as any)["FooClass"] = class FooClass {

        static sayHello() {
            return "Hello, World!"
        }

        fooValue: string = ""

        invoker: (methodName: string, args: any[]) => void

        callYamiedie(roleA: string, roleB: string) {
            this.invoker("handleNativeCall", [])
            return roleB + " said: '" + roleA + " Yamiedie'."
        }

    }
    
}