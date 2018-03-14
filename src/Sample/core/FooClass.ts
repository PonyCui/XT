if (XT.platform === "Web") {

    (window as any)["FooClass"] = class FooClass {

        fooValue: string = ""

        invokeMethod: any;

        callYamiedie(roleA: string, roleB: string) {
            this.invokeMethod("handleNativeCall", [])
            return roleB + " said: '" + roleA + " Yamiedie'."
        }

    }
    
}