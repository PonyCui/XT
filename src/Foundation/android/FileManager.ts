/// <reference path="../xtf.d.ts" />
import { Data } from "./Data";
import { FileManager as IFileManager } from '../interface/FileManager'

/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

export class FileManager extends IFileManager {

    static document: FileManager = new FileManager(0)
    static cache: FileManager = new FileManager(1)
    static tmp: FileManager = new FileManager(2)
    static sdcard: FileManager = new FileManager(3)

    writeData(data: Data, path: string): boolean {
        return _XTFFileManager.writeData(data.objectRef, path, this.location)
    }

    readData(path: string): Data | undefined {
        const dataRef = _XTFFileManager.readData(path, this.location)
        return typeof dataRef === "string" ? Data.initWithRef(dataRef) : undefined
    }

    isFileExist(path: string): boolean {
        return _XTFFileManager.fileExists(path, this.location)
    }

    deleteFile(path: string): boolean {
        return _XTFFileManager.deleteFile(path, this.location)
    }

    list(path: string): string[] {
        return _XTFFileManager.list(path, this.location)
    }

}