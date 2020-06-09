const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db  = require('./models');
require('dotenv').config({path: __dirname + '/.env'});

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    db.User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.googleAPIKey,
    callbackURL: process.env.googleAPIURL
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile)
    const result = db.User.find({password: profile.id})
    .then((result) =>{
        if(result.length !== 0)
          db.User.findOrCreate({ password: profile.id}, function (err, user) {//replace googleId with password ut it is temprory for changing password we have another issue
            return cb(err, user);
          })
        else
          db.User.findOrCreate({ password: profile.id, email: profile.emails[0].value, firstName: profile.name.givenName, lastName:profile.name.familyName }, function (err, user) {//replace googleId with password
            return cb(err, user);
          });
        })
    .catch(function (err) {
        // If an error occurs, send the error back to the client
        console.log(err);
    });
  }
));