import { ClassType, ClassLoader } from './ClassLoader'
import { Debug } from "./Debug";

declare var module: any

module.exports = {
    currentSDK: "0.1.1",
    platform: "iOS",
    ClassType,
    ClassLoader,
    Debug,
}