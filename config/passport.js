const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const Users = require('../model/UsersModel')

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
    function (username, password, done) {
        Users.findOne({ where: { username: username, password: password } })
            .then(users => {
                if(!users || !Users.prototype.correctPassword(req.body.password)) {
                    return done(null, false, { message: 'Incorrect Username' });
                }
                return done(null, users)
            }).catch(err => done(err));
        }
    )
);

