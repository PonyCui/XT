
enum DeviceOrientation {
    Unknown = 0,
    Portrait = 1,
    PortraitUpsideDown = 2,
    LandscapeLeft = 3,
    LandscapeRight = 4,
    FaceUp = 5,
    FaceDown = 6,
}

export class Device {

    static current: Device

    name: string
    systemName: string
    systemVersion: string
    xtRuntimeVersion: string
    model: string
    orientation: DeviceOrientation

    isiOS(): Boolean { return false }
    isAndroid(): Boolean { return false }
    isWeb(): Boolean { return false }

}