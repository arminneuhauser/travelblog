var http = require("http");
var auth = require("http-auth");
var basic = auth({
  authRealm: "Private area",
  authFile: __dirname + "/htpasswd",
  authType: "basic"
});
var server = http.createServer(function(request, response) {
  basic.apply(request, response, function(username) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello " + username);
    response.end();
  });
});

server.listen(80);
console.log("Server is listening");
