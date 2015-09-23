/**
 * Created by Vietpn on 9/17/2015.
 */
var connect = require("connect")
var http = require("http")

var app = connect()
//function doFirst(request, responses, next){
//    console.log("Bacon")
//    next()
//}
//
//function doSecond(request, responses, next){
//    console.log("Tuna")
//    next()
//}

//app.use(doFirst)
//app.use(doSecond)
function profile(request, responses){
    console.log("User requested profile")
}
function forum(request, responses){
    console.log("User requested forum")
}
app.use('/profile', profile)
app.use('/forum', forum)

http.createServer(app).listen(8888)
console.log("Sever is running...")