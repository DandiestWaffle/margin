﻿var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// user model
var userSchema = mongoose.Schema({
    userName        : String,
    email           : String,
    password        : String,
    confirmed       : { type: Boolean, default: false },
    game            : {
        started     : { type: Boolean, default: false },
        amount      : { type: Number, default: 20000 },
        startedOn   : Date,
        transactions: [ { type: mongoose.Schema.ObjectId, ref: 'Transaction' } ],
        stocks      : [ { type: mongoose.Schema.ObjectId, ref: 'Stock' } ]
    },
    token           : String,
    flag            : {
        state       : { type: Boolean, default: false },
        token       : { type: String, default: '' }
    }
});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(process.env.SALT), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users
module.exports = mongoose.model('User', userSchema);