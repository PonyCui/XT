import { Data } from "./Data";

/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */

export class FileManager {

    static document: FileManager = new FileManager(0)
    static cache: FileManager = new FileManager(1)
    static tmp: FileManager = new FileManager(2)
    static sdcard: FileManager = new FileManager(3)

    protected constructor(protected location: number) {}

    writeData(data: Data, path: string): boolean {
        return false
    }

    readData(path: string): Data | undefined {
        return undefined
    }

    isFileExist(path: string): boolean {
        return false
    }

    deleteFile(path: string): boolean {
        return false
    }

    list(path: string): string[] {
        return []
    }

}