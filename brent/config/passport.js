/**
 * Created by vietpn on 24/09/2015.
 */
var localStrategy = require("passport-local").Strategy,
    User = require('../app/models/user').User,
    Token = require('../app/models/user').Token,
    configAuth = require('./auth'),
    facebookStrategy = require("passport-facebook").Strategy,
    googleStrategy = require('passport-google-oauth').OAuth2Strategy,
    bearStrategy = require('passport-http-bearer').Strategy;



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
                if(!req.user){
                    var newUser = new User();
                    newUser.local.username = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                }else{
                    var user = req.user;
                    user.local.username = email;
                    user.local.password = user.generateHash(password);
                    user.save(function(err){
                        if(err)
                            throw err;
                        return done(null, user);
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
            profileFields: configAuth.facebookAuth.profileFields,
            passReqToCallback: true
        },function(req, accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                // user is not logged in yet
                if(!req.user){
                    User.findOne({'facebook.id': profile.id}, function(err, user){
                        if(err)
                            return done(err);
                        if(user){
                            if(!user.facebook.token){
                                user.facebook.id = profile.id;
                                user.facebook.token = accessToken;
                                user.facebook.email = profile.emails[0].value;
                                user.facebook.name = profile.displayName;

                                user.save(function(err){
                                    if(err)
                                        throw err;
                                    return done(null, user)
                                })
                            }
                            return done(null, user);
                        } else{
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
                // use is logged in already, and need to be merge
                }else{
                    var user = req.user;
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;
                    user.facebook.email = profile.emails[0].value;
                    user.facebook.name = profile.displayName;

                    user.save(function(err){
                        if(err)
                            throw err;
                        return done(null, user)
                    })
                }
            })
    }));

    /**
     * Passport for Auth Google
     */
    passport.use(new googleStrategy({
            clientID: configAuth.googlekAuth.clientID,
            clientSecret: configAuth.googlekAuth.clientSecret,
            callbackURL: configAuth.googlekAuth.callbackURL,
            passReqToCallback: true
        },function(req, accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            // user is not logged in yet
            if(!req.user){
                User.findOne({'google.id': profile.id}, function(err, user){
                    if(err)
                        return done(err);
                    if(user){
                        if(!user.google.token){
                            user.google.id = profile.id;
                            user.google.token = accessToken;
                            user.google.email = profile.emails[0].value;
                            user.google.name = profile.displayName;

                            user.save(function(err){
                                if(err)
                                    throw err;
                                return done(null, user)
                            })
                        }
                        return done(null, user);
                    } else{
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
            // use is logged in already, and need to be merge
            }else{
                var user = req.user;
                user.google.id = profile.id;
                user.google.token = accessToken;
                user.google.email = profile.emails[0].value;
                user.google.name = profile.displayName;

                user.save(function(err){
                    if(err)
                        throw err;
                    return done(null, user)
                })
            }
        })
    }));


    passport.use(new bearStrategy(
        function(token, done) {
            Token.findOne({value : token}).populate('user').exec(function(err, token){
                if(!token)
                    return done(null, false);
                return done(null, token.user);
            })
        }
    ));
}