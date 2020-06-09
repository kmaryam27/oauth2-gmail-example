const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('./passport-config');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require ('mongoose');
require('dotenv').config({path: __dirname + '/.env'});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = process.env.port;
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
    name: 'macys-session',
    keys: ['key1', 'key2']
  }));

  const isLoggedIn = (req, res, next) => {
      req.user? next(): res.sendStatus(401);
  }

  mongoose.connect(process.env.mongoURI,{ useNewUrlParser: true });


app.get('/', (req, res) => res.send('welcome page not login to dashboard'));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

app.get('/login', (req, res) => res.send('error log in or logout user'));
app.get('/dashboard', (req, res) => res.send('user login'));//isLoggedIn

app.get('/logout', (req, res) =>{
    req.session = null;
    req.logOut();
    res.redirect('/login')
});
var GoogleAuth; // Google Auth object.
app.get('/new', (req, res) => {
  gapi.client.init({
    'apiKey': process.env.googleAPIKey,
    'clientId': process.env.clientID,
    'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
}).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);
});
})
app.listen(port, () => console.log(`port: ${port} is running now!!!`));
