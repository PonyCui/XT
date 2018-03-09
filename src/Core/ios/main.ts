import { ClassType, ClassLoader } from './ClassLoader'
import { Debug } from "./Debug";
import { BaseObject } from './BaseObject';
import { BaseArray } from './BaseArray';

declare var module: any

module.exports = {
    currentSDK: "0.1.1",
    platform: "iOS",
    BaseObject,
    BaseArray,
    ClassType,
    ClassLoader,
    Debug,
}