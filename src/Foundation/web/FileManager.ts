/// <reference path="../xtf.d.ts" />
import { Data } from "./Data";
import { FileManager as IFileManager } from '../interface/FileManager'
declare var pako: any

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
        if (typeof pako === "undefined") {
            console.error("Please add <script src='https://cdn.jsdelivr.net/npm/pako@1.0.6/dist/pako.min.js'></script> to HTML")
            return false
        }
        if (data.buffer.byteLength > 1024 * 100) {
            console.error("Can not write data byteLength > 100K.");
            return false;
        }
        if (this.location == 3) {
            console.error("Not support sdcard FileManager.");
            return false;
        }
        const storageKey = this.buildURL(path)
        try {
            this.storage.setItem(storageKey, pako.deflate(new Uint8Array(data.buffer), { to: 'string' }) as string)
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    }

    readData(path: string): Data | undefined {
        if (typeof pako === "undefined") {
            console.error("Please add <script src='https://cdn.jsdelivr.net/npm/pako@1.0.6/dist/pako.min.js'></script> to HTML")
            return undefined
        }
        if (this.location == 3) {
            console.error("Not support sdcard FileManager.");
            return undefined;
        }
        const storageKey = this.buildURL(path)
        try {
            const item = this.storage.getItem(storageKey)
            if (item !== undefined && item !== null) {
                return Data.initWithBytes(pako.inflate(item))
            }
            else {
                return undefined
            }
        } catch (error) {
            return undefined
        }
    }

    isFileExist(path: string): boolean {
        if (this.location == 3) {
            console.error("Not support sdcard FileManager.");
            return false;
        }
        const storageKey = this.buildURL(path)
        const item = this.storage.getItem(storageKey)
        return item !== undefined && item !== null
    }

    deleteFile(path: string): boolean {
        if (this.location == 3) {
            console.error("Not support sdcard FileManager.");
            return false;
        }
        this.storage.removeItem(this.buildURL(path))
        return true
    }

    list(path: string): string[] {
        const baseURL = this.buildURL(path)
        let result: string[] = []
        for (let index = 0; index < this.storage.length; index++) {
            const storageKey = this.storage.key(index);
            if (typeof storageKey === "string" && storageKey.indexOf(baseURL) === 0) {
                result.push(storageKey.replace(baseURL, ''))
            }
        }
        return result
    }

    private get storage(): Storage {
        return this.location === 2 || this.location === 1 ? sessionStorage : localStorage
    }

    private buildURL(path: string) {
        if (path.indexOf("/") === 0) {
            path = path.substring(1)
        }
        if (this.location == 0) {
            return "file:///document/" + path
        }
        else if (this.location == 1) {
            return "file:///cache/" + path
        }
        else if (this.location == 2) {
            return "file:///tmp/" + path
        }
        else {
            return "file://404/"
        }
    }

}