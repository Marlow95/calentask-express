const express = require('express');
const passport = require('passport');
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

.post(passport.authenticate('local'),(req, res) => {
    console.log(req.body.password)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.send(`Hello ${req.body.username}`)
})

usersRouter.route('/login/forgot')

.get((req, res) => {
    res.statusCode = 200;
    res.send('You forgot your username/password')
})

usersRouter.route('/dashboard')

.get(passport.authenticate('local'),(req, res) => {
    Users.findOne({where:{username: username}})
    if(!req.session){
        err.statusCode = 401
        res.send('You aren\'t logged in')
    } else {
        res.statusCode = 200;
        res.send(`Hello ${req.body.username} this is your Dashboard!`)
    }
}) 

usersRouter.route('/settings')

.get(passport.authenticate('local'),(req, res) => {
    const user = Users.findOne({where:{username: username}})
    res.statusCode = 200;
    res.send(`Hello ${user} these are your settings!`)
})

usersRouter.route('/logout')

.get(passport.authenticate('local'),(req, res, next) => {
    if(req.session){
        res.statusCode = 200;
        req.logout()
        res.redirect('/')
        res.send(`You have logged out successfully`)
    } else{
        const err = new Error('You are not logged in')
        err.statusCode = 401
        return next(err)
    }
    
})

module.exports = usersRouter