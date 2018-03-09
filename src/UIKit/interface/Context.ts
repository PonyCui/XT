import { ViewController } from "./ViewController";

export class Context extends XT.BaseObject {

    static startWithNamed(name: string, options: any, completion: (rootViewController: ViewController) => void): Context { throw Error("Method not implemented.") }

    static startWithURL(url: string, options: any, completion: (rootViewController: ViewController) => void, failure: (error: Error) => void): Context { throw Error("Method not implemented.") }

}