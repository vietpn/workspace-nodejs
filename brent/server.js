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
    bodyParse = require("body-parser"),
    passport = require("passport"),
    flash = require("connect-flash");

// setup config Database
var conifgDB = require('./config/database');
mongoose.connect(conifgDB.url);
require('./config/passport')(passport);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParse.urlencoded({
    extended : false
}));

// using session
app.use(session({
    secret: 'anyString',
    resave: true,
    saveUninitialized: true
}));

// using passport
app.use(passport.initialize());
app.use(passport.session());
// using flash
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./app/routes.js')(app, passport);
app.listen(port);

console.log("Server running on port: " + port);