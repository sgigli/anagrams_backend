const User = require('../models/user.js'); // User Model
const connectEnsureLogin = require('connect-ensure-login');

module.exports = function(app, passport) {
  app.post("/sign_up", function(req, res) {
    User.register({ username: req.body.username }, req.body.password)
  })

  app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
    res.send(200)
  });

   app.get('/logout', function(req, res) {
    req.logout();
    res.send(200)
  });

  app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.send(200);
  });
}