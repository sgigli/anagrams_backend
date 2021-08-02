const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const User = require('./models/user.js');

const app = express();

app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

require("./routes/user.js")(app, passport);

mongoose.connect('mongodb://localhost/anagram_app',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const port = 8080;
app.listen(port, () => console.log(`This app is listening on port ${port}`));