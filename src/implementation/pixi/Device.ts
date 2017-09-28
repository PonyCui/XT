import { DeviceOrientation } from "../../interface/Device";
import { version } from './Runtime'
import * as PIXI from 'pixi.js'

export class Device {

    static currentDevice = new Device()

    static get current(): Device {
        return this.currentDevice
    }

    constructor() { }

    public get name(): string {
        return "PIXI"
    }

    public get systemName(): string {
        return "PIXI"
    }

    public get systemVersion(): string {
        return PIXI.VERSION
    }

    public get xtRuntimeVersion(): string {
        return version
    }

    public get model(): string {
        return "PIXI"
    }

    public get orientation(): DeviceOrientation {
        return 0
    }

    isiOS(): Boolean { return false }
    isAndroid(): Boolean { return false }
    isWeb(): Boolean { return true }

}