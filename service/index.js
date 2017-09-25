var http = require('http');
var https = require('https');
var fs = require('fs');
var url = require('url');
var path = require('path');
var process = require('process');

var server = http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (url.parse(req.url).pathname.indexOf("/breakpoint") === 0) {
        breakpoint(req, res);
    }
    else if (url.parse(req.url).pathname.indexOf("/evalresult") === 0) {
        evalresult(req, res);
    }
    else if (url.parse(req.url).pathname.indexOf("/build") === 0) {
        console.log("build >>> " + (new Date()).toString());
        res.end();
    }
    else if (url.parse(req.url).pathname.indexOf("/connected") === 0) {
        console.log("connected >>> " + decodeURIComponent(url.parse(req.url).pathname.replace("/connected", "")));
        res.end();
    }
    else {
        serve(req, res);
    }
});

function address() {
    var os = require('os');
    var IPs = [], hostName;
    hostName = os.hostname();
    for (var key in os.networkInterfaces()) {
        var element = os.networkInterfaces()[key];
        for (var index = 0; index < element.length; index++) {
            var subelement = element[index];
            if (subelement.family === "IPv4") {
                IPs.push(subelement.address);
            }
        }
    }
    IPs.unshift("10.0.2.2")
    return IPs;
}

function requestPinCode(argCode) {
    var objectID = undefined;
    try {
        objectID = JSON.parse(fs.readFileSync('/tmp/com.opensource.xt.pincode.json', { encoding: "utf-8" }))["objectId"];
    } catch (error) { }
    var code = argCode || (parseInt(Math.random() * 899999) + 100000)
    var ADDRESS = address()
    var finalADDRESS = []
    for (var index = 0; index < ADDRESS.length; index++) {
        finalADDRESS.push("http://" + ADDRESS[index] + ":" + PORT + "/")
    }
    var data = '{"PinCode": ' + code + ', "services": ' + JSON.stringify(finalADDRESS) + '}'
    var options = {
        host: "zax3y00w.api.lncld.net",
        port: "443",
        path: "/1.1/classes/Pin" + (objectID !== undefined ? "/" + objectID : ""),
        method: objectID !== undefined ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json",
            "X-LC-Id": "zAx3Y00WjcMeXeuaxfw9HSsQ-gzGzoHsz",
            "X-LC-Key": "pKOyX7Czry2YS9y6KR6G4X34",
        }
    }
    var post_req = https.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            try {
                if (JSON.parse(chunk)["code"] == 1) {
                    fs.unlinkSync('/tmp/com.opensource.xt.pincode.json');
                    return requestPinCode(code);
                }
            } catch (error) { }
            fs.writeFileSync('/tmp/com.opensource.xt.pincode.json', chunk)
        });
    });
    post_req.write(data);
    post_req.end();
    return code;
}

function serve(req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname === "/") {
        var files = fs.readdirSync(path.join(__dirname, '../dist'));
        for (var index = 0; index < files.length; index++) {
            if (files[index].endsWith("min.js")) {
                res.write("http://" + req.headers.host + "/" + files[index]);
                res.write("\n")
            }
        }
        res.write("");
        res.end();
    }
    var filePath = path.join(__dirname, '../dist' + pathname)
    fs.readFile(filePath, "binary", function (err, file) {
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.end(err.message);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(file, "binary");
            res.end();
        }
    });
}

function evalresult(req, res) {
    console.log(decodeURIComponent(url.parse(req.url).pathname).replace("/evalresult/", 'Eval Result >>> '))
    res.end();
}

var breakpointWaiting = false;

function breakpoint(req, res) {
    process.stdin.removeAllListeners("data");
    if (!breakpointWaiting) {
        process.stdout.write(decodeURIComponent(url.parse(req.url).pathname) + " >>> ")
    }
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    breakpointWaiting = true;
    const handler = function (text) {
        if (text.trim() === "n") {
            breakpointNext(req, res);
            breakpointWaiting = false;
        }
        else {
            breakpointKeep(req, res, text.trim())
            breakpointWaiting = false;
        }
    };
    process.stdin.on('data', handler)
}

function breakpointKeep(req, res, eval) {
    process.stdin.removeAllListeners("data");
    process.stdin.pause();
    res.write(eval || '0');
    res.end();
}

function breakpointNext(req, res) {
    process.stdin.removeAllListeners("data");
    process.stdin.pause();
    res.write('1');
    res.end();
}

var ADDRESS = address()
var PORT = parseInt(process.argv[2]) || 8083
server.listen(PORT);

for (var index = 0; index < ADDRESS.length; index++) {
    console.log("Service on >>> " + "http://" + ADDRESS[index] + ":" + PORT + "/");
}
console.log("PinCode >>> " + requestPinCode());