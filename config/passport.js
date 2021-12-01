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
                if(!users) {
                    return done(null, false, { message: 'Incorrect Username' });
                };

                const isValid = Users.prototype.correctPassword(req.body.password)
                
                if (isValid) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
                /*if(!users.password === password){
                    return done(null, false, { message: 'Incorrect Password' });
                }
                return done(null, users)*/
            }).catch(err => done(err));
        }
    )
);

