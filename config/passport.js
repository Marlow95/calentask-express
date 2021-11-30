const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const Users = require('../model/UsersModel')
const crypto = require('crypto')

//Salt and Hash Functions
function validPassword(password, hash, salt){
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify
}

function genPassword(password){
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        has: genHash
    }
}

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
                if(!users || !users.password) {
                    return done(null, false, { message: 'Incorrect Username' });
                };
                //const isValid = validPassword(users.password, users.hash, users.salt)
                return done(null, users);
               /* if(isValid) {
                    return done(null, users);
                } else{
                    return done(null, false, { message: 'Incorrect Password'})
                }*/
            }).catch(err => done(err));
        }
    ));

