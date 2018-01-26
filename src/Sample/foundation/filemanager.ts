import { TestBase, TestCase } from "./base";

export class FileManagerSample extends TestBase {

    viewDidLoad() {
        super.viewDidLoad()
        this.title = 'FileManager'
    }

    saveAndReadTests() {
        const data = NS.Data.initWithString("Hello, World!")
        this.assert(NS.FileManager.document.writeData(data, "foo.txt"))
        const readData = NS.FileManager.document.readData("foo.txt")
        this.assert(readData !== undefined && readData.utf8String() === "Hello, World!")
    }

    directorySaveAndReadTests() {
        const data = NS.Data.initWithString("Hello, World!")
        this.assert(NS.FileManager.document.writeData(data, "bar/foo.txt"))
        const readData = NS.FileManager.document.readData("bar/foo.txt")
        this.assert(readData !== undefined && readData.utf8String() === "Hello, World!")
    }

    listTests() {
        const data = NS.Data.initWithString("Hello, World!")
        this.assert(NS.FileManager.document.writeData(data, "foo2.txt"))
        this.assert(NS.FileManager.document.list('/').indexOf("foo2.txt") >= 0)
    }

    existTests() {
        const data = NS.Data.initWithString("Hello, World!")
        this.assert(NS.FileManager.document.writeData(data, "foo3.txt"))
        this.assert(NS.FileManager.document.isFileExist('foo3.txt'))
    }

    deleteTests() {
        const data = NS.Data.initWithString("Hello, World!")
        this.assert(NS.FileManager.document.writeData(data, "foo4.txt"))
        this.assert(NS.FileManager.document.deleteFile('foo4.txt') && !NS.FileManager.document.isFileExist('foo4.txt'))
    }

}