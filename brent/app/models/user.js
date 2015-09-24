/**
 * Created by vietpn on 24/09/2015.
 */
var mogoose = require("mongoose");

var userScheme = mogoose.Schema({
    local: {
        username: String,
        password: String
    }
})

module.exports = mongoose.model("user", userScheme)