/**
 * Created by vietpn on 24/09/2015.
 */
var mongoose = require("mongoose");

var userScheme = mongoose.Schema({
    local: {
        username: String,
        password: String
    }
})

module.exports = mongoose.model("user", userScheme)