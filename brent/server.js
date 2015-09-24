/**
 * Created by vietpn on 23/09/2015.
 */
var express = require("express"),
    app = express(),
    port = process.env.PORT || 8080,
    morgan = require("morgan"),
    cookieParser = require("cookie-parser"),
    session = require('express-session'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParse = require("body-parser");

// setup config Database
var conifgDB = require('./config/database')
mongoose.connect(conifgDB.url)


app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParse.urlencoded({
    extended : false
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'anystringtypehere',
    resave: true,
    saveUninitialized: true

}))


require('./app/routes.js')(app)
app.listen(port)

console.log("Server running on port: " + port)