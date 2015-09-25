/**
 * Created by vietpn on 24/09/2015.
 */
var localStrategy = require("passport-local").Strategy,
    User = require('../app/models/user');

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
                if(err) return done(err);

                if(user){
                    return done(null, false, req.flash("signupMessage", "That email already taken"));
                } else {
                    var newUser = new User();
                    newUser.local.username = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err){
                        if(err) throw err;
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
}