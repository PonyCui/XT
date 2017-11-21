import { DeviceOrientation } from "../../interface/Device";

export class Device {

    static get current(): Device {
        return new Device(XTRDevice.xtr_current())
    }

    nativeObjectRef: any;

    public set nativeObject(value: any) { }

    public get nativeObject(): any {
        return xtrRequestNativeObject(this.nativeObjectRef);
    }

    constructor(nativeObjectRef: any) {
        this.nativeObjectRef = nativeObjectRef;
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

    isiOS(): Boolean { return true }
    isAndroid(): Boolean { return false }
    isWeb(): Boolean { return false }

}