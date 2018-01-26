import { DeviceOrientation } from "../interface/Device";

export class Device {

    public static get deviceName(): string {
        return _XTUIDevice.xtr_name()
    }

    public static get systemName(): string {
        return _XTUIDevice.xtr_systemName()
    }

    public static get systemVersion(): string {
        return _XTUIDevice.xtr_systemVersion()
    }

    public static get xtRuntimeVersion(): string {
        return _XTUIDevice.xtr_xtRuntimeVersion()
    }

    public static get model(): string {
        return _XTUIDevice.xtr_model()
    }

    public static get orientation(): DeviceOrientation {
        return _XTUIDevice.xtr_orientation()
    }

    isiOS(): Boolean { return false }
    isAndroid(): Boolean { return true }
    isWeb(): Boolean { return false }

}