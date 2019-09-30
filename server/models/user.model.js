const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const saltRounds = 10;

const userSchema = new Schema({
  username: {type: String,required: true, unique: true, trim: true, minlength: 3},
  password: {type: String, required: true},
  isProvider: {type: Boolean, required: true},
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