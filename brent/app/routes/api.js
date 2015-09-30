/**
 * Created by vietpn on 30/09/2015.
 */
var express = require('express'),
    router = express.Router(),
    fs = require('fs');

module.exports = function(passport){

    // check authenticate before all actions
    //router.use(passport.authenticate('bearer', { session: false }))

    router.use(function(req, res, next){
        fs.appendFile('logs.txt', req.path + " token: " + req.query.access_token + "\n",
            function(err){
                next();
            });
    })

    // need authenticated
    router.get('/testAPI', function(req, res, next){
        if(req.query.access_token) next();
        else next('route')
    }, passport.authenticate('bearer', {session: false}),
        function(req, res){
            res.json({secretData : '123', Authenticated: true});
        })

    // don't need authenticated
    router.get('/testAPI', function(req, res){
        res.json({secretData : '123', Authenticated: false});
    })

    return router;
}