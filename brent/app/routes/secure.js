/**
 * Created by vietpn on 24/09/2015.
 */
var express = require('express'),
    router = express.Router(),
    User = require('../models/user').User,
    Token = require('../models/user').Token;

module.exports = function(passport){
    // check if user is not logged, redirect to login
    router.use(function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }

        res.redirect('/auth/login');
    });

    router.get('/profile',
        function(req, res){
            res.render('secured/profile', {
                user: req.user
            })
        })
    router.get('/getToken', function(req, res){
        User.findOne({_id : req.user.id}).populate('token').exec(function(err, user){
            if(user.token == null)
                user.generateToken();
            req.user = user
            res.redirect('/profile')
        })
    });

    router.get('/testToken', function(req, res){
        User.findOne({_id : req.user.id}).populate('token').exec(function(err, user){
            res.json(user)
        })
    });

    router.get('/*', function(req, res){
        res.redirect('/profile')
    })

    return router;
}
