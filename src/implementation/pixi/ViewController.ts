import { View } from "./View";

export class ViewController {

    view: View

    constructor() {
        this.loadView();
        this.viewDidLoad();        
    }

    loadView(): void {
        this.view = new View();
    }

    viewDidLoad(): void { }
    viewWillAppear(): void { }
    viewDidAppear(): void { }
    viewWillDisappear(): void { }
    viewDidDisappear(): void { }
    viewWillLayoutSubviews(): void { }
    viewDidLayoutSubviews(): void { }

}