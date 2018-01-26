/**
 * Apache Licenses Version 2.0
 * Author: Pony Cui
 */
import { URLSessionTask } from "./URLSessionTask";
import { Data } from "./Data";
import { URLRequest } from "./URLRequest";
import { URLResponse } from "./URLResponse";

export class URLSession {

    static sharedSession: URLSession

    dataTaskWithURL(url: string, completionHandler: (data?: Data, response?: URLResponse, error?: Error) => void): URLSessionTask { throw Error("Not implemented.") }
    dataTaskWithRequest(req: URLRequest, completionHandler: (data?: Data, response?: URLResponse, error?: Error) => void): URLSessionTask { throw Error("Not implemented.") }

}