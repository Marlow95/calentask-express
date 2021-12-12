const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const Users = require('../model/UsersModel')
const bcrypt = require('bcrypt')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

//passport config

passport.serializeUser(async (users, done) => {
    console.log('Serialize')
    console.log(users)
    return done(null, users.id);
})

passport.deserializeUser(function (id, done) {
    console.log("Deserialize");
    Users.findOne({ where: { id: id } })
    .then(users => {
        console.log(users);
        return done(null, users);
    }).catch(err => done(err))
})

passport.use(new LocalStrategy(
    function(username, password, done) {
     
        Users.findOne({ where: { username: username }})
            .then(users => {
    
               if(!users || !bcrypt.compareSync(password, users.password)) {
                    return done(null, false, { message: 'Incorrect Username' });
                } else{
                    console.log('This is the users pass: ' + users.password)
                    console.log(`This is the password ${password}`)
                    
                    return done(null, users)
                } 
            }).catch(err => done(err));
        }
    )
);

//google oauth
/*
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
       Users.findOrCreate({where: { googleId: profile.id }}, function (err, user) {
         return done(err, user);
       });
  }
));*/

exports.verifyUser = passport.authenticate('local')
