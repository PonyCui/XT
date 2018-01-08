/// <reference path="../src/xt.d.ts" />
// import { List } from "./explorer/list";

// class AppDelegate extends XT.ApplicationDelegate {

//     applicationDidFinishLaunchingWithOptions() {
//         this.window = new XT.Window();
//         this.window.backgroundColor = XT.Color.yellowColor
//         // this.window.rootViewController = new XT.NavigationController(new List())
//         this.window.makeKeyAndVisible();
//     }

// }

// const sampleApplication = new XT.Application('app', new AppDelegate());
// console.log("Hello, World!1231231213");

// XT.Image.fromURL("http://www.httpbin.org/image/png", (it) => {
//     const s = it.imageWithImageRenderingMode(XT.ImageRenderingMode.Template)
//     console.log((it as any).objectRef);
//     console.log((s as any).objectRef);
    
// })

XT.Image.fromAssets("location", (it) => {
    console.log(it);
    
})