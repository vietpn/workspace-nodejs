/**
 * Created by vietpn on 23/09/2015.
 */
var express = require("express"),
    app = express(),
    port = process.env.PORT || 8080,
    morgan = require("morgan"),
    cookieParser = require("cookie-parser")
    session = require('express-session')
    mongoose = require('mongoose');

// setup config Database
var conifgDB = require('./config/database')
mongoose.connect(conifgDB.url)


app.use(morgan("dev"));
app.use(cookieParser());
app.use(session({
    secret: 'anystringtypehere',
    resave: true,
    saveUninitialized: true

}))


// setup route
//app.use("/", function(req, res){
//    res.send("On First Express program!");
//    console.log(req.cookies);
//    console.log("==========================");
//    console.log(req.session)
//})
require('./app/routes.js')(app)
app.listen(port)

console.log("Server running on port: " + port)