import { DeviceOrientation } from "../../interface/Device";

export class Device {

    static get current(): Device {
        return new Device()
    }

    public get name(): string {
        return XTRDevice.xtr_name()
    }

    public get systemName(): string {
        return XTRDevice.xtr_systemName()
    }

    public get systemVersion(): string {
        return XTRDevice.xtr_systemVersion()
    }

    public get xtRuntimeVersion(): string {
        return XTRDevice.xtr_xtRuntimeVersion()
    }

    public get model(): string {
        return XTRDevice.xtr_model()
    }

    public get orientation(): DeviceOrientation {
        return XTRDevice.xtr_orientation()
    }

    isiOS(): Boolean { return true }
    isAndroid(): Boolean { return false }
    isWeb(): Boolean { return false }

}