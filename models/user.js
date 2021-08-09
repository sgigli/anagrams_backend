const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  email: String,
  username: String,
  password: String
}, {
  timestamps: true,
  toObject: {
    transform: (_doc, user) => {
      delete user.hash
      delete user.salt
      return user
    }
  }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', User);