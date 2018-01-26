import { TestBase, TestCase } from "./base";

export class DataSample extends TestBase {

    testData: NS.Data
    test2Data: NS.Data
    test3Data: NS.Data

    viewDidLoad() {
        super.viewDidLoad()
        this.title = 'Data'
    }

    setup() {
        this.testData = NS.Data.initWithBase64EncodedString("SGVsbG8sIFdvcmxkIQ==") as NS.Data;
        this.test2Data = NS.Data.initWithBytes(new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33])) as NS.Data;
        this.test3Data = NS.Data.initWithString("Hello, World!")
        this.testData.retain();
        this.test2Data.retain();
        this.test3Data.retain();
        this.assert(this.testData !== undefined && this.test2Data !== undefined && this.test3Data !== undefined)
    }

    isEqualToTests() {
        this.assert(this.testData.isEqualTo(this.test2Data))
    }

    utf8StringTests() {
        this.assert(
            this.testData.utf8String() === "Hello, World!" &&
            this.test2Data.utf8String() === "Hello, World!" &&
            this.test3Data.utf8String() === "Hello, World!")
    }

    base64Tests() {
        this.assert(this.testData.base64EncodedString() === "SGVsbG8sIFdvcmxkIQ==")
    }

    md5Tests() {
        this.assert(this.testData.md5() === "65A8E27D8879283831B664BD8B7F0AD4")
    }

    sha1Tests() {
        this.assert(this.testData.sha1() === "0A0A9F2A6772942557AB5355D76AF442F8F65E01")
    }

}