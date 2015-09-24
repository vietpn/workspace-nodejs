/**
 * Created by vietpn on 24/09/2015.
 */
var User = require("./models/user")

module.exports = function(app){
    app.get('/', function(req, res){
        res.send("Hello world...")
    })

    app.get('/:username/:password', function(req, res){
        var newUser = new User()
        newUser.local.username = req.params.username
        newUser.local.password = req.params.password

        console.log(newUser.username + " " + newUser.password)

        // save database
        newUser.save(function(err){
            if(err) throw err
        })

        res.send("Success")
    })
}