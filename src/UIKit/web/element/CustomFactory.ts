export class CustomViewFactory {

    static factoryMapping: { [key: string]: typeof CustomViewFactory } = {}

    static register(className: string, factory: typeof CustomViewFactory) {
        this.factoryMapping[className] = factory;
    }

    owner: any;

    requestInnerHTML(): string {
        return "<div></div>"
    }

    requestProps(node: Node): any {
        return {}
    }

    setProps(node: Node, value: any) {

    }

    emitMessage(message: any) {
        if (this.owner && this.owner.handleMessage) {
            this.owner.handleMessage(message)
        }
    }

    handleMessage(node: Node, message: any) {

    }

}