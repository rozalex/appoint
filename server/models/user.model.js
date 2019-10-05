const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const saltRounds = 10;

const userSchema = new Schema({
  email: {type: String,required: true, unique: true, trim: true, minlength: 3},
  username: {type: String,required: true, unique: true, trim: true, minlength: 3},
  password: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  phone: {type: String, required: true},
  type: {type: String, required: true},
  business: [{
    name: {type: String,required: true, unique: true, trim: true, minlength: 3},
    location: {type: String, required: true},
    description: {type: String, required: true}
  }],
  favorites: [{
    businessid: {type: String,required: true, unique: true, trim: true, minlength: 3},
    businessname: {type: String,required: true, unique: true, trim: true, minlength: 3},
  }]
}, {
  timestamps: true,
});

userSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
        if (err) {
          next(err);
        }
        else {
          document.password = hashedPassword;
          next();
        }
      });
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;