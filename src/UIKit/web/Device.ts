export enum DeviceOrientation {
    Unknown = 0,
    Portrait = 1,
    PortraitUpsideDown = 2,
    LandscapeLeft = 3,
    LandscapeRight = 4,
    FaceUp = 5,
    FaceDown = 6,
}

export class Device {

    static current: Device = new Device()

    deviceName: string = navigator.vendor
    systemName: string = navigator.platform
    systemVersion: string = ""
    model: string = ""
    orientation: DeviceOrientation = DeviceOrientation.Unknown

}