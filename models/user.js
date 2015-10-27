// TODO
//array of characters char= []

// require dependencies
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt');
  salt = bcrypt.genSaltSync(10);

// set up shorthand method name
var Schema = mongoose.Schema;

// define user schema
var userSchema = new Schema({
  email: { type:String, required:true },
  passwordDigest: { type:String, required:true },
  confirmPassword: { type:String, required:true },
  penname: { type:String, required:true }
});

// create a new user with secure (hashed) password
userSchema.statics.createSecure = function (email, password, penname, callback) {
// `this` references our User model
// store it in variable `UserModel` because `this` changes context in nested callbacks

var UserModel = this;

// hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
    console.log('salt: ', salt);  // changes every time
    bcrypt.hash(password, salt, function (err, hash) {

      // create the new user (save to db) with hashed password
      UserModel.create({
        email: email,
        penname: String,
        passwordDigest: hash
      }, callback);
    });
  });
};

// define user model
var User = mongoose.model('User', userSchema);

// export user model
module.exports = User;