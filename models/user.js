// require dependencies
var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10);

// set up shorthand method name
var Schema = mongoose.Schema;

function toLower (v) {
  return v.toLowerCase();
}

// define user schema
var userSchema = new Schema({
  email: { type:String, required:true, select:false, set: toLower },
  passwordDigest: { type:String, required:true, select:false },
  penname: { type:String },
  projects: [{type: Schema.Types.ObjectId, ref: 'Project'}]
});

// create a new user with secure (hashed) password
userSchema.statics.createSecure = function (email, password, callback) {
  // `this` references our schema
  // store it in variable `user` because `this` changes context in nested callbacks

  var user = this;

  // hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      console.log(hash);

      // create the new user (save to db) with hashed password
      user.create({
        email: email,
        passwordDigest: hash
      }, callback);
    });
  });
};

// authenticate user (when user logs in)
userSchema.statics.authenticate = function (email, password, callback) {
  // find user by email entered at log in
  //.select("passwordDigest email").exec(callback)
  this.findOne({email: email}).select('email passwordDigest').exec(function (err, user) {
    console.log(user);

    // throw error if can't find user
    if (!user) {
      callback('No user with email ' + email, null);

    // if found user, check if password is correct
    } else if (user.checkPassword(password)) {
      callback(null, user);
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
userSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  console.log("this is: ", this); // should be user?
  console.log('Password: ', password);
  console.log('Password Digest: ', this.passwordDigest);
  return bcrypt.compareSync(password, this.passwordDigest);
};

// define user model
var User = mongoose.model('User', userSchema);

// export user model
module.exports = User;