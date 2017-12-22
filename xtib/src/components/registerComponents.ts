import { ButtonLayer } from "./ButtonLayer";
import { ViewLayer } from "./ViewLayer";

export function registerComponents() {
    console.log("Components has been registed >>> ",
        ViewLayer.componentName,
        ButtonLayer.componentName,
    )

}