import { ClassType, ClassLoader } from './ClassLoader'
import { Debug } from "./Debug";
import { BaseObject } from './BaseObject';
import { BaseArray } from './BaseArray';
import { ExtObject } from './ExtObject';

declare var module: any

module.exports = {
    currentSDK: "0.1.3",
    platform: "Web",
    BaseObject,
    ExtObject,
    BaseArray,
    ClassType,
    ClassLoader,
    Debug,
}