/**
 * Created by vietpn on 24/09/2015.
 */
var localStrategy = require("passport-local").Strategy,
    User = require('../app/models/user'),
    configAuth = require('./auth'),
    facebookStrategy = require("passport-facebook").Strategy,
    googleStrategy = require('passport-google-oauth').OAuth2Strategy;



module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    /**
     * Passport for signup new user
     */
    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:  true,
    }, function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({'local.username' : email}, function(err, user){
                if(err)
                    return done(err);
                if(user)
                    return done(null, false, req.flash("signupMessage", "That email already taken"));
                else {
                    var newUser = new User();
                    newUser.local.username = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                }
            })
        })
    }));

    /**
     * passport for login user
     */
    passport.use('local-login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({'local.username': email}, function(err, user){
                if(err)
                    return done(err);
                if(!user)
                    return done(null, false, req.flash("loginMessage", "No User found"));
                if(!user.validPassword(password))
                    return done(null, false, req.flash("loginMessage", "Invalid"));

                return done(null, user)

            })
        })
    }))


    /**
     * passport for authen facebook
     */
    passport.use(new facebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: configAuth.facebookAuth.profileFields
        },function(accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                User.findOne({'facebook.id': profile.id}, function(err, user){
                    if(err)
                        return done(err);
                    if(user)
                        return done(null, user);
                    else{
                        var newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.name = profile.displayName;

                        newUser.save(function(err){
                            if(err)
                                throw err;
                            return done(null, newUser)
                        })
                    }
                })
            })
    }));

    /**
     * Passport for Auth Google
     */
    passport.use(new googleStrategy({
            clientID: configAuth.googlekAuth.clientID,
            clientSecret: configAuth.googlekAuth.clientSecret,
            callbackURL: configAuth.googlekAuth.callbackURL
        },function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            User.findOne({'google.id': profile.id}, function(err, user){
                if(err)
                    return done(err);
                if(user)
                    return done(null, user);
                else{
                    var newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.token = accessToken;
                    newUser.google.email = profile.emails[0].value;
                    newUser.google.name = profile.displayName;

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser)
                    })
                }
            })
        })
    }));
}