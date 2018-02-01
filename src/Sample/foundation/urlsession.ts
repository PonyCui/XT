import { TestBase, TestCase } from "./base";

export class URLSessionSample extends TestBase {

    viewDidLoad() {
        super.viewDidLoad()
        this.title = 'URLSession'
    }

    dataTaskWithURLTests(_: TestCase) {
        _.isAsync = true
        NS.URLSession.sharedSession.dataTaskWithURL("http://www.httpbin.org/get?foo=Hello,%20World!", (data, response) => {
            _.level = 1
            this.assert(data !== undefined, "Response Data Undefined Check", _)
            this.assert(response !== undefined, "Response Object Undefined Check", _)
            if (data && response) {
                _.level = 2
                const strValue = data.utf8String();
                this.assert(strValue !== undefined && JSON.parse(strValue)["args"]["foo"] === "Hello, World!", "Response Data Content Check", _)
                this.assert(response.url === "http://www.httpbin.org/get?foo=Hello,%20World!", "Response URL Check", _)
                this.assert(response.statusCode < 400, "Response statusCode Check", _)
                if (typeof navigator === "undefined") {
                    this.assert(response.allHeaderFields["X-Powered-By"] === "Flask", "Response allHeaderFields Check", _)    
                }
                _.asyncResolover()
            }
        }).resume()
    }

    dataTaskWithRequestTests(_: TestCase) {
        _.isAsync = true
        const req = new NS.URLRequest("http://www.httpbin.org/get?foo=Hello,%20World!")
        NS.URLSession.sharedSession.dataTaskWithRequest(req, (data, response) => {
            _.level = 1
            this.assert(data !== undefined, "Response Data Undefined Check", _)
            if (data) {
                _.level = 2
                const strValue = data.utf8String();
                this.assert(strValue !== undefined && JSON.parse(strValue)["args"]["foo"] === "Hello, World!", "Response Data Content Check", _)
                _.asyncResolover()
            }
        }).resume()
    }

    dataTaskWithPostRequestTests(_: TestCase) {
        _.isAsync = true
        const req = new NS.URLRequest("http://www.httpbin.org/post")
        req.setHTTPMethod("POST")
        req.setHTTPBody("Hello, World!")
        req.setHTTPHeader("text/plain", "Content-Type")
        NS.URLSession.sharedSession.dataTaskWithRequest(req, (data) => {
            _.level = 1
            this.assert(data !== undefined, "Response Data Undefined Check", _)
            if (data) {
                _.level = 2
                const strValue = data.utf8String();
                this.assert(strValue !== undefined && JSON.parse(strValue)["data"] === "Hello, World!", "Response Data Content Check", _)
                _.asyncResolover()
            }
        }).resume()
    }

    dataTaskWithFormRequestTests(_: TestCase) {
        _.isAsync = true
        const req = new NS.URLRequest("http://www.httpbin.org/post")
        req.setHTTPMethod("POST")
        req.setHTTPBody("foo=Hello, World!")
        req.setHTTPHeader("application/x-www-form-urlencoded", "Content-Type")
        NS.URLSession.sharedSession.dataTaskWithRequest(req, (data) => {
            _.level = 1
            this.assert(data !== undefined, "Response Data Undefined Check", _)
            if (data) {
                const strValue = data.utf8String();
                this.assert(strValue !== undefined && JSON.parse(strValue)["form"]["foo"] === "Hello, World!", "Response Data Content Check", _)
                _.asyncResolover()
            }
        }).resume()
    }

}