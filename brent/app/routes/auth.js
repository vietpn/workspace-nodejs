/**
 * Created by vietpn on 24/09/2015.
 */
var User = require("../models/user"),
    express = require('express'),
    router = express.Router();

module.exports = function(passport){
    // localhost:8080/auth/
    router.get('/',
        function(req, res){
            res.render('index')
        })

    // localhost:8080/auth/login
    router.get('/login',
        function(req, res){
            res.render('login', {
                message: req.flash('loginMessage')})
        })
    router.post('/login',
        passport.authenticate('local-login', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true
        }))

    // localhost:8080/auth/signup
    router.get('/signup',
        function(req, res){
            res.render('signup', {
                message: req.flash('signupMessage')
            })
        })
    router.post('/signup',
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true
        }));


    router.get('/facebook',
        passport.authenticate('facebook', {authType: 'rerequest', scope : ['public_profile', 'email']}));

    router.get('/facebook/callback',
        passport.authenticate('facebook', {successRedirect: '/profile', failureRedirect: '/'}));


    router.get('/google',
        passport.authenticate('google', { scope: ['email', 'profile']}));

    router.get('/google/callback',
        passport.authenticate('google', { successRedirect: '/profile' , failureRedirect: '/'}));


    router.get('/connect/facebook',
        passport.authenticate('facebook', {authType: 'rerequest', scope : ['public_profile', 'email']}));
    router.get('/connect/google',
        passport.authenticate('google', { scope: ['email', 'profile']}));
    router.get('/connect/local',
        function(req, res){
            res.render('connect-local', {
                message: req.flash('signupMessage')
            })
        })
    router.post('/connect/local',
        passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/connect/local',
            failureFlash: true
        }));


    router.get('/logout',
        function(req, res){
            req.logout();
            res.redirect('/')
        })


    router.get('/unlink/facebook', function(req,res){
        var user = req.user;
        user.facebook.token = null;
        user.save(function(err){
            if(err)
                throw err;
            res.redirect('/profile');
        })
    });
    router.get('/unlink/google', function(req, res){
        var user = req.user;
        user.google.token = null;
        user.save(function(err){
            if(err)
                throw err;
            res.redirect('/profile');
        })
    });
    router.get('/unlink/local', function(req, res){
        var user = req.user;
        user.local.username = null;
        user.local.password = null;

        user.save(function(err){
            if(err)
                throw err;
            res.redirect('/profile');
        })
    });

    return router;
}
