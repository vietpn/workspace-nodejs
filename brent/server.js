/**
 * Created by vietpn on 23/09/2015.
 */
var express = require("express"),
    app = express(),
    port = process.env.PORT || 8080,
    morgan = require("morgan"),
    cookieParser = require("cookie-parser")
    session = require('express-session');

app.use(morgan("dev"));
app.use(cookieParser());
app.use(session({
    secret: 'anystringtypehere',
    resave: false,
    saveUninitialized: true

}))

app.use("/", function(req, res){
    res.send("On First Express program!");
    console.log(req.cookies);
    console.log("==========================");
    console.log(req.session)
})

app.listen(port)

console.log("Server running on port: " + port)