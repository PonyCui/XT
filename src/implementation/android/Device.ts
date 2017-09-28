import { DeviceOrientation } from "../../interface/Device";

export class Device {

    static get current(): Device {
        return new Device(XTRDevice.xtr_current())
    }

    private nativeObject: any;

    constructor(nativeObject: any) {
        this.nativeObject = nativeObject;
    }

    public get name(): string {
        return this.nativeObject.xtr_name()
    }

    public get systemName(): string {
        return this.nativeObject.xtr_systemName()
    }

    public get systemVersion(): string {
        return this.nativeObject.xtr_systemVersion()
    }

    public get xtRuntimeVersion(): string {
        return this.nativeObject.xtr_xtRuntimeVersion()
    }

    public get model(): string {
        return this.nativeObject.xtr_model()
    }

    public get orientation(): DeviceOrientation {
        return this.nativeObject.xtr_orientation()
    }

    isiOS(): Boolean { return false }
    isAndroid(): Boolean { return true }
    isWeb(): Boolean { return false }

}