import { ViewController } from "./ViewController";
import { Releasable } from "./Releasable";

export class Context implements Releasable {

    retain(): this {
        throw new Error("Method not implemented.");
    }
    
    release(): this {
        throw new Error("Method not implemented.");
    }

    static startWithNamed(name: string, options: any, completion: (rootViewController: ViewController) => void): Context { throw Error("Method not implemented.") }

    static startWithURL(url: string, options: any, completion: (rootViewController: ViewController) => void, failure: (error: Error) => void): Context { throw Error("Method not implemented.") }

}