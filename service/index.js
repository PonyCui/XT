var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var process = require('process');

var server = http.createServer(function (req, res) {
    if (url.parse(req.url).pathname.indexOf("/breakpoint") === 0) {
        breakpoint(req, res);
    }
    else {
        serve(req, res);
    }
});

server.listen(8083);

function serve(req, res) {
    var pathname = url.parse(req.url).pathname;
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

function breakpoint(req, res) {
    process.stdin.removeAllListeners("data");
    process.stdout.write(decodeURIComponent(url.parse(req.url).pathname) + " >>> ")
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    const timer = setTimeout(() => {
        breakpointKeep(req, res)
    }, 60000);
    const handler = function (text) {
        if (text.trim() === "n") {
            breakpointNext(req, res);
        }
        else {
            breakpointKeep(req, res, text.trim())
        }
        clearTimeout(timer);
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