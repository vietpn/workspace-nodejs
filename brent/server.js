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
    flash = require("connect-flash"),
    mongoStore = require('connect-mongo')(session);

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
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection , ttl: 14 * 24 * 60 * 60}) // 14 days
}));

// using passport
app.use(passport.initialize());
app.use(passport.session());
// using flash
app.use(flash());

//app.use(function(req, res, next){
//    console.log(req.session);
//    console.log("===================");
//    console.log(req.user);
//    next();
//});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



var auth = require('./app/routes/auth')(passport);
var secure = require('./app/routes/secure')(passport);
var api = require('./app/routes/api')(passport);

app.use('/auth', auth);
app.use('/api', api);
app.use('/', secure);


app.listen(port);

console.log("Server running on port: " + port);