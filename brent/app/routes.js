/**
 * Created by vietpn on 24/09/2015.
 */
var User = require("./models/user")

module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index')
    })

    app.get('/signup', function(req, res){
        res.render('signup', {
            message: 'Victory'
        })
    })

    app.post('signup', function(req, res){
        var newUser = new User()

        newUser.local.username = req.body.username
        newUser.local.password = req.body.password

        // save database and throw error
        newUser.save(function(err){
            if(err) throw err
        })

        // redirect to index
        res.redirect('/')
    })
}