/**
 * Created by vietpn on 24/09/2015.
 */
var User = require("./models/user")

module.exports = function(app, passport){
    app.get('/', function(req, res){
        res.render('index')
    })

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

    app.get('/:username/:password', function(req, res){
        var newUser = new User();
        newUser.local.username = req.params.username;
        newUser.local.password = req.params.password;
        console.log(newUser.local.username + " " + newUser.local.password);
        newUser.save(function(err){
            if(err)
                throw err;
        });
        res.send("Success!");
    })
}