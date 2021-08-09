const User = require('../models/user.js'); // User Model
const connectEnsureLogin = require('connect-ensure-login');

module.exports = function(app, passport) {
  app.post("/sign_up", function(req, res) {
    User.register({ email: req.body.email, username: req.body.username }, req.body.password)
      .then(user => {
        res.json({ user: user.toObject() })
      })
  })

  app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
    User.findOne({ username: req.body.username })
      .then(user => {
        res.json({ user: user.toObject() })
      })
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.sendStatus(200)
  });

  app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendStatus(200);
  });
}