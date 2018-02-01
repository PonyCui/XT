/// <reference path="../xtf.d.ts" />
import { Data } from './Data';
import { URLSession as IURLSession } from '../interface/URLSession'
import { URLRequest } from './URLRequest';
import { URLSessionTask } from './URLSessionTask';
import { URLResponse } from './URLResponse';

export class URLSession extends IURLSession {

    static sharedSession: URLSession = new URLSession()

    dataTaskWithURL(url: string, completionHandler: (data?: Data, response?: URLResponse, error?: Error) => void): URLSessionTask {
        const req = new URLRequest(url, 15, 0)
        return this.dataTaskWithRequest(req, completionHandler)
    }

    dataTaskWithRequest(req: URLRequest, completionHandler: (data?: Data, response?: URLResponse, error?: Error) => void): URLSessionTask {
        const { request, body } = req.buildRequest()
        return new URLSessionTask(request, body, completionHandler);
    }

}