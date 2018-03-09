import { ClassType, ClassLoader } from './ClassLoader'
import { Debug } from "./Debug";
import { BaseObject } from './BaseObject';

declare var module: any

module.exports = {
    currentSDK: "0.1.1",
    platform: "Android",
    BaseObject,
    ClassType,
    ClassLoader,
    Debug,
}