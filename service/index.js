var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer(function (req, res) {
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
});
server.listen(8083)