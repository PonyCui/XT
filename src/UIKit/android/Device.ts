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

    public static get model(): string {
        return _XTUIDevice.xtr_model()
    }

}