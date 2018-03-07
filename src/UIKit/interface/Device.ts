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

    static deviceName: string
    static systemName: string
    static systemVersion: string
    static model: string

}