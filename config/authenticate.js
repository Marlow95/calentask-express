const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const Users = require('../model/UsersModel')
const bcrypt = require('bcrypt')

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

/*
const hashPassword = async (password, saltRounds = 10) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash password
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
    }

    // Return null if error
    return null;
};*/

passport.use(new LocalStrategy(
    function(username, password, done) {
        Users.findOne({ where: { username: username, password: password } })
            .then(async users => {
                /*
                let inputedPassHash = hashPassword(password)
                const inputedPass = inputedPassHash.toString() */

               if(!users || !users.password/*!users.validPassword(inputedPassHash, users.password)*/) {
                    return done(null, false, { message: 'Incorrect Username' });
                } else{
                    console.log('This is the users pass: ' + users.password)
                    console.log('This is the password ' + password)
                    return done(null, users)
                } 
            }).catch(err => done(err));
        }
    )
);

exports.verifyUser = passport.authenticate('local')
 
exports.verifyAdmin = (req, res, next) => {
    const admin = Users.findOne({where: {role: 'admin'}})
    if(admin){
        return next()
    } else{
        const err = new Error('You are\'nt authorized')
        err.statusCode = 403;
        return next(err)
    }
}