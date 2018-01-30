/// <reference path="../xtf.d.ts" />
import { Data } from './Data';
import { URLSession as IURLSession } from '../interface/URLSession'
import { URLRequest } from './URLRequest';
import { URLSessionTask } from './URLSessionTask';
import { URLResponse } from './URLResponse';

export class URLSession extends IURLSession {

    static sharedSession: URLSession = new URLSession()

    dataTaskWithURL(url: string, completionHandler: (data?: Data, response?: URLResponse, error?: Error) => void): URLSessionTask {
        return new URLSessionTask(_XTFURLSession.dataTaskWithURLCompletionHandler(url, (dataRef?: string, responseRef?: string, errorMessage?: string) => {
            const data = typeof dataRef === "string" ? Data.initWithRef(dataRef) : undefined;
            const response = typeof responseRef === "string" ? new URLResponse(responseRef) : undefined;
            const error = typeof errorMessage === "string" ? new Error(errorMessage) : undefined
            completionHandler(data, response, error);
        }));
    }

    dataTaskWithRequest(req: URLRequest, completionHandler: (data?: Data, response?: URLResponse, error?: Error) => void): URLSessionTask {
        return new URLSessionTask(_XTFURLSession.dataTaskWithRequestCompletionHandler(req.objectRef, (dataRef?: string, responseRef?: string, errorMessage?: string) => {
            const data = typeof dataRef === "string" ? Data.initWithRef(dataRef) : undefined;
            const response = typeof responseRef === "string" ? new URLResponse(responseRef) : undefined;
            const error = typeof errorMessage === "string" ? new Error(errorMessage) : undefined
            completionHandler(data, response, error);
        }));
    }

}