const express = require('express');
const authenticate = require('../config/authenticate')
const usersRouter = express.Router()
const Users = require('../model/UsersModel')


usersRouter.route('/')

.get((req, res, next) => {
    Users.findAll()
    .then(users => {
        console.log("All users:", JSON.stringify(users, null, 4));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.send(users)
    }).catch( err => next(err));

})

usersRouter.route('/signup')

.post((req, res, next) => {
    console.log(req.user)
    Users.create({ 
        firstname: req.body.firstname, 
        lastname: req.body.lastname, 
        username: req.body.username, 
        email: req.body.email,
        password: req.body.password
    })
    .then(users => {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json')
        res.json(users)
    })
    .catch(err => next(err))
})

usersRouter.route('/login')

.post(authenticate.verifyUser,(req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.send(`Hello ${req.user.username}`)
})

usersRouter.route('/logout')
.get((req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('sessionId');
        res.redirect('/api');
    } else {
        const err = new Error('You are not logged in!');
        err.status = 401;
        return next(err);
    }
})

usersRouter.route('/:userId')
.get(authenticate.verifyUser,(req, res, next) => {
    Users.findOne({where: {username: req.params.userId}})
    .then(user => {
        if(!user){
            res.send('The Username you provided doesn\'t exist')
        } else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.send(`Hello ${user.firstname}, this is your Dashboard!`)}
    }).catch( err => next(err));
})


//users can update info except user and pass
usersRouter.route('/:userId/settings')

.put(authenticate.verifyUser,(req,res) => {
    Users.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }, {where: {username: req.params.userId}})
    .then(user => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(user)
    })
    .catch(err => next(err))
})

module.exports = usersRouter