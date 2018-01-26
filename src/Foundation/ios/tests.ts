import { URLRequest } from './URLRequest'
import { URLSession } from './URLSession';
import { Data } from './Data';
import { UserDefaults } from './UserDefaults';
import { FileManager } from './FileManager';
import { NotificationCenter, Notification } from './Notification';
import { ClassType, ClassLoader } from './ClassLoader'
import { WebSocket } from './WebSocket';

class DataTests {

    testData: Data
    test2Data: Data
    test3Data: Data

    constructor() {
        this.setup();
        this.utf8StringTest();
        this.isEqualToTest();
        this.base64Test();
        this.md5Test()
        this.sha1Test()
    }

    setup() {
        this.testData = Data.initWithBase64EncodedString("SGVsbG8sIFdvcmxkIQ==") as Data;
        this.test2Data = Data.initWithBytes(new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33])) as Data;
        this.test3Data = Data.initWithString("Hello, World!")
        this.testData.retain();
        this.test2Data.retain();
        this.test3Data.retain();
        if (this.testData === undefined || this.test2Data === undefined || this.test3Data === undefined) {
            console.log("Fail >>> DataTests setup")
        }
        else {
            console.log("Pass >>> DataTests setup")
        }
    }

    isEqualToTest() {
        if (this.testData.isEqualTo(this.test2Data)) {
            console.log("Pass >>> DataTests isEuqalToTest")
        }
        else {
            console.log("Fail >>> DataTests isEuqalToTest")
        }
    }

    utf8StringTest() {
        if (this.testData.utf8String() === "Hello, World!" &&
            this.test2Data.utf8String() === "Hello, World!" &&
            this.test3Data.utf8String() === "Hello, World!") {
            console.log("Pass >>> DataTests utf8StringTest")
        }
        else {
            console.log("Fail >>> DataTests utf8StringTest")
        }
    }

    base64Test() {
        if (this.testData.base64EncodedString() === "SGVsbG8sIFdvcmxkIQ==") {
            console.log("Pass >>> DataTests base64Test")
        }
        else {
            console.log("Fail >>> DataTests base64Test")
        }
    }

    md5Test() {
        if (this.testData.md5() === "65A8E27D8879283831B664BD8B7F0AD4") {
            console.log("Pass >>> DataTests md5Test")
        }
        else {
            console.log("Fail >>> DataTests md5Test")
        }
    }

    sha1Test() {
        if (this.testData.sha1() === "0A0A9F2A6772942557AB5355D76AF442F8F65E01") {
            console.log("Pass >>> DataTests sha1Test")
        }
        else {
            console.log("Fail >>> DataTests sha1Test")
        }
    }

}

new DataTests();

class URLSessionTests {

    constructor() {
        this.dataTaskWithURLTest();
        this.dataTaskWithRequestTest();
        this.dataTaskWithPostRequestTest();
        this.dataTaskWithFormRequestTest();
    }

    dataTaskWithURLTest() {
        URLSession.sharedSession.dataTaskWithURL("http://www.httpbin.org/get?foo=Hello,%20World!", (data, response) => {
            if (data) {
                const strValue = data.utf8String();
                if (strValue) {
                    if (JSON.parse(strValue)["args"]["foo"] === "Hello, World!") {
                        console.log("Pass >>> URLSessionTests dataTaskWithURLTest")
                    }
                    else {
                        console.log("Fail >>> URLSessionTests dataTaskWithURLTest Fail")
                    }
                }
                else {
                    console.log("Fail >>> URLSessionTests dataTaskWithURLTest")
                }
            }
            else {
                console.log("Fail >>> URLSessionTests dataTaskWithURLTest")
            }
            if (response) {
                if (response.url === "http://www.httpbin.org/get?foo=Hello,%20World!") {
                    console.log("Pass >>> URLSessionTests response url")
                }
                else {
                    console.log("Fail >>> URLSessionTests response url")
                }
                if (response.statusCode < 400) {
                    console.log("Pass >>> URLSessionTests response statusCode")
                }
                else {
                    console.log("Fail >>> URLSessionTests response statusCode")
                }
                if (response.allHeaderFields["X-Powered-By"] === "Flask") {
                    console.log("Pass >>> URLSessionTests response allHeaderFields")
                }
                else {
                    console.log("Fail >>> URLSessionTests response allHeaderFields")
                }
            }
            else {
                console.log("Fail >>> URLSessionTests response")
            }
        }).resume()
    }

    dataTaskWithRequestTest() {
        const req = new URLRequest("http://www.httpbin.org/get?foo=Hello,%20World!")
        URLSession.sharedSession.dataTaskWithRequest(req, (data, response) => {
            if (data) {
                const strValue = data.utf8String();
                if (strValue) {
                    if (JSON.parse(strValue)["args"]["foo"] === "Hello, World!") {
                        console.log("Pass >>> URLSessionTests dataTaskWithRequestTest")
                    }
                    else {
                        console.log("Fail >>> URLSessionTests dataTaskWithRequestTest")
                    }
                }
                else {
                    console.log("Fail >>> URLSessionTests dataTaskWithRequestTest")
                }
            }
            else {
                console.log("URLSessionTests dataTaskWithRequestTest Fail.")
            }
        }).resume()
    }

    dataTaskWithPostRequestTest() {
        const req = new URLRequest("http://www.httpbin.org/post")
        req.setHTTPMethod("POST")
        req.setHTTPBody("Hello, World!")
        req.setHTTPHeader("text/plain", "Content-Type")
        URLSession.sharedSession.dataTaskWithRequest(req, (data) => {
            if (data) {
                const strValue = data.utf8String();
                if (strValue) {
                    if (JSON.parse(strValue)["data"] === "Hello, World!") {
                        console.log("Pass >>> URLSessionTests dataTaskWithPostRequestTest")
                    }
                    else {
                        console.log("Fail >>> URLSessionTests dataTaskWithPostRequestTest")
                    }
                }
                else {
                    console.log("Fail >>> URLSessionTests dataTaskWithPostRequestTest")
                }
            }
            else {
                console.log("Fail >>> URLSessionTests dataTaskWithPostRequestTest")
            }
        }).resume()
    }

    dataTaskWithFormRequestTest() {
        const req = new URLRequest("http://www.httpbin.org/post")
        req.setHTTPMethod("POST")
        req.setHTTPBody("foo=Hello, World!")
        req.setHTTPHeader("application/x-www-form-urlencoded", "Content-Type")
        URLSession.sharedSession.dataTaskWithRequest(req, (data) => {
            if (data) {
                const strValue = data.utf8String();
                if (strValue) {
                    if (JSON.parse(strValue)["form"]["foo"] === "Hello, World!") {
                        console.log("Pass >>> URLSessionTests dataTaskWithFormRequestTest")
                    }
                    else {
                        console.log("Fail >>> URLSessionTests dataTaskWithFormRequestTest")
                    }
                }
                else {
                    console.log("Fail >>> URLSessionTests dataTaskWithFormRequestTest")
                }
            }
            else {
                console.log("Fail >>> URLSessionTests dataTaskWithFormRequestTest")
            }
        }).resume()
    }

}

new URLSessionTests();

class UserDefaultsTests {

    constructor() {
        this.stringValueTest()
        this.intValueTest()
        this.boolValueTest()
        this.mapValueTest()
        this.arrayValueTest()
    }

    stringValueTest() {
        UserDefaults.standard.set("Hello, World!", "testKey")
        if (UserDefaults.standard.get("testKey") === "Hello, World!") {
            console.log("Pass >>> UserDefaultsTests stringValueTest")
        }
        else {
            console.log("Fail >>> UserDefaultsTests stringValueTest")
        }
    }

    intValueTest() {
        UserDefaults.standard.set(123, "testKey2")
        if (UserDefaults.standard.get("testKey2") === 123) {
            console.log("Pass >>> UserDefaultsTests intValueTest")
        }
        else {
            console.log("Fail >>> UserDefaultsTests intValueTest")
        }
    }

    boolValueTest() {
        UserDefaults.standard.set(true, "testKey3")
        if (UserDefaults.standard.get("testKey3") === true) {
            console.log("Pass >>> UserDefaultsTests boolValueTest")
        }
        else {
            console.log("Fail >>> UserDefaultsTests boolValueTest")
        }
    }

    mapValueTest() {
        UserDefaults.standard.set({ aKey: "aValue" }, "testKey4")
        if (UserDefaults.standard.get("testKey4")["aKey"] === "aValue") {
            console.log("Pass >>> UserDefaultsTests mapValueTest")
        }
        else {
            console.log("Fail >>> UserDefaultsTests mapValueTest")
        }
    }

    arrayValueTest() {
        UserDefaults.standard.set([1, 2, 3], "testKey5")
        if (UserDefaults.standard.get("testKey5")[0] === 1) {
            console.log("Pass >>> UserDefaultsTests arrayValueTest")
        }
        else {
            console.log("Fail >>> UserDefaultsTests arrayValueTest")
        }
    }

}

new UserDefaultsTests()

class FileManagerTests {

    constructor() {
        this.saveAndReadTest()
        this.directorySaveAndReadTest()
        this.listTest()
        this.existTest()
        this.deleteTest()
    }

    saveAndReadTest() {
        const data = Data.initWithString("Hello, World!")
        if (FileManager.document.writeData(data, "foo.txt")) {
            const readData = FileManager.document.readData("foo.txt")
            if (readData && readData.utf8String() === "Hello, World!") {
                console.log("Pass >>> FileManagerTests saveAndReadTest")
            }
            else {
                console.log("Fail >>> FileManagerTests saveAndReadTest")
            }
        }
        else {
            console.log("Fail >>> FileManagerTests saveAndReadTest")
        }
    }

    directorySaveAndReadTest() {
        const data = Data.initWithString("Hello, World!")
        if (FileManager.document.writeData(data, "bar/foo.txt")) {
            const readData = FileManager.document.readData("bar/foo.txt")
            if (readData && readData.utf8String() === "Hello, World!") {
                console.log("Pass >>> FileManagerTests directorySaveAndReadTest")
            }
            else {
                console.log("Fail >>> FileManagerTests directorySaveAndReadTest")
            }
        }
        else {
            console.log("Fail >>> FileManagerTests directorySaveAndReadTest")
        }
    }

    listTest() {
        if (FileManager.document.list('/').indexOf("foo.txt") >= 0) {
            console.log("Pass >>> FileManagerTests listTest")
        }
        else {
            console.log("Fail >>> FileManagerTests listTest")
        }
    }

    existTest() {
        if (FileManager.document.isFileExist('foo.txt')) {
            console.log("Pass >>> FileManagerTests existTest")
        }
        else {
            console.log("Fail >>> FileManagerTests existTest")
        }
    }

    deleteTest() {
        if (FileManager.document.deleteFile('foo.txt') &&
            !FileManager.document.isFileExist('foo.txt')) {
            console.log("Pass >>> FileManagerTests deleteTest")
        }
        else {
            console.log("Fail >>> FileManagerTests deleteTest")
        }
    }

}

new FileManagerTests()

class NotificationTests {

    constructor() {
        this.addTests()
        this.postTests();
    }

    private noteHandler: string | undefined = undefined
    private receivedNote: Notification | undefined = undefined

    addTests() {
        this.noteHandler = NotificationCenter.default.addObserver("Test", (note) => {
            this.receivedNote = note
        })
    }

    postTests() {
        NotificationCenter.default.postNotification("Test", "Hello, World!", { aKey: "aValue" });
        setTimeout(() => {
            if (this.receivedNote instanceof Notification &&
                this.receivedNote.object === "Hello, World!" &&
                this.receivedNote.userInfo.aKey === "aValue") {
                console.log("Pass >>> NotificationTests addTests & postTests")
                this.removeTests();
            }
            else {
                console.log("Fail >>> NotificationTests addTests & postTests")
            }
        }, 16)
    }

    removeTests() {
        if (this.noteHandler) {
            this.receivedNote = undefined
            NotificationCenter.default.removeObserver(this.noteHandler)
            NotificationCenter.default.postNotification("Test", "Hello, World!", { aKey: "aValue" });
            setTimeout(() => {
                if (!(this.receivedNote instanceof Notification)) {
                    console.log("Pass >>> NotificationTests removeTests")
                }
                else {
                    console.log("Fail >>> NotificationTests removeTests")
                }
            }, 16)
        }
    }

}

new NotificationTests()

declare var Foo: any

class ClassLoaderTests {

    constructor() {
        this.loadClassTests()
    }

    loadClassTests() {
        try {
            ClassLoader.loadClass(ClassType.ObjC, "FooClass", "Foo")
            if (Foo.sayHello() === "Hello, World!") {
                console.log("Pass >>> ClassLoaderTests loadClassTests")
            }
            else {
                console.log("Fail >>> ClassLoaderTests loadClassTests")
            }
        } catch (error) {
            console.log("Fail >>> ClassLoaderTests loadClassTests")
        }
    }

}

new ClassLoaderTests()

class WebSocketTests {

    socket: WebSocket

    constructor() {
        this.connectTests()
    }

    connectTests() {
        var connected = false
        var send_and_received = false
        this.socket = new WebSocket("ws://echo.websocket.org").retain()
        this.socket.onOpen = () => {
            connected = true
            this.socket.sendString("Hello, World!");
        }
        this.socket.onMessage = (msg) => {
            if (msg === "Hello, World!") {
                send_and_received = true
                this.socket.close()
            }
        }
        setTimeout(() => {
            if (connected && send_and_received) {
                console.log("Pass >>> WebSocketTests connectTests");
            }
            else {
                console.log("Fail >>> WebSocketTests connectTests");
            }
        }, 2000)
    }

}

new WebSocketTests()