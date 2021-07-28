const User = require('../models/user.js'); // User Model
const connectEnsureLogin = require('connect-ensure-login');

module.exports = function(app, passport) {
  app.post("/sign_up", function(req, res) {
    console.log(req.body)
    User.register({ username: req.body.username }, req.body.password)
  })
}