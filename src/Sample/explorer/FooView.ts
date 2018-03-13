if (XT.platform === "Web") {

    (window as any).FooView = class FooView {

        element = document.createElement("div")

        public get fooColor(): string {
            return this.element.style.background || "";
        }

        public set fooColor(value: string) {
            this.element.style.background = value
        }

    };

}