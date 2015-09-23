/**
 * Created by Vietpn on 9/17/2015.
 */

var http = require('http')
var fs = require('fs')

// 404 response
function send404Response(response){
    response.writeHead(404, {"Content-Type" : "text/plain"})
    response.write("Eror 404: page not found")
    response.end()
}

// Handle a user request
function onRequest(request, responsese){
    if(request.method == 'GET' && request.url == '/'){
        responsese.writeHead(200, {"Content-Type":"text/html"})
        fs.createReadStream("./index.html").pipe(responsese)
    }else{
        send404Response(responsese)
    }
}

http.createServer(onRequest).listen(8888)
console.log("Server is now running...")