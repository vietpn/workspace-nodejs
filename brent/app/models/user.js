/**
 * Created by vietpn on 24/09/2015.
 */
var mongoose = require("mongoose"),
    bcrypt = require("bcrypt");


var userScheme = mongoose.Schema({
    local: {
        username: String,
        password: String
    }
})

userScheme.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userScheme.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model("user", userScheme)