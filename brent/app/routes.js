/**
 * Created by vietpn on 24/09/2015.
 */
var User = require("./models/user")

module.exports = function(app, passport){
    app.get('/', function(req, res){
        res.render('index')
    })

    /**
     * login
     */
    app.get('/login', function(req, res){
        res.render('login', {
            message: req.flash('loginMessage')
        })
    })
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))

    /**
     * Screen profile user
     */
    app.get('/profile', function(req, res){
        res.render('profile', {
            user: req.user
        })
    })


    /**
     * sign up user
     */
    app.get('/signup', function(req, res){
        res.render('signup', {
            message: req.flash('signupMessage')
        })
    })
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /**
     * User logout
     */
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/')
    })

    /**
     * Facebook
     */
    app.get('/auth/facebook', passport.authenticate('facebook', {authType: 'rerequest', scope : ['public_profile', 'email']}));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile', failureRedirect: '/'
    }));
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next
    }

    res.redirect('/login')
}