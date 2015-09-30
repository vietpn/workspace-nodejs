/**
 * Created by vietpn on 24/09/2015.
 */
var mongoose = require("mongoose"),
    schema = mongoose.Schema,
    bcrypt = require("bcrypt"),
    randtoken = require('rand-token');


var userScheme = mongoose.Schema({
    local: {
        username: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    token : {
        type: schema.Types.ObjectId,
        ref: 'Token',
        default: null
    }
})

var tokenSchema = mongoose.Schema({
    value: String,
    user: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    expireAt: {
        type: Date,
        expires: 60*60, // 60 seconds
    }
})

userScheme.methods.generateToken = function(){
    var token = new Token();
    token.value = randtoken.generate(32);
    token.user = this._id;
    this.token = token._id;
    this.save(function(err){
        if(err)
            throw err;
        token.save(function(err){
            if(err)
                throw err;
        })
    })
}

userScheme.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userScheme.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password)
}

var User = mongoose.model('User', userScheme);
var Token = mongoose.model('Token', tokenSchema);
var Models = {User: User, Token: Token};


module.exports = Models;