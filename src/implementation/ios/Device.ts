import { DeviceOrientation } from "../../interface/Device";

export class Device {

    public static get deviceName(): string {
        return XTRDevice.xtr_name()
    }

    public static get systemName(): string {
        return XTRDevice.xtr_systemName()
    }

    public static get systemVersion(): string {
        return XTRDevice.xtr_systemVersion()
    }

    public static get xtRuntimeVersion(): string {
        return XTRDevice.xtr_xtRuntimeVersion()
    }

    public static get model(): string {
        return XTRDevice.xtr_model()
    }

    public static get orientation(): DeviceOrientation {
        return XTRDevice.xtr_orientation()
    }

    static isiOS(): Boolean { return true }
    static isAndroid(): Boolean { return false }
    static isWeb(): Boolean { return false }

}