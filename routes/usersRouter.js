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
        res.json(users)
    })
    .catch( err => next(err));
})

usersRouter.route('/signup')

.post((req, res, next) => {
    Users.create({ 
        firstname: req.body.firstname, 
        lastname: req.body.lastname, 
        username: req.body.username, 
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
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
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.json('You are logged in')
})

usersRouter.route('/login/forgot')

.get((req, res) => {
    res.statusCode = 200;
    res.send('You forgot your username/password')
})

//username page that everyone can see
usersRouter.route('/:userId')

.get((req, res) => {
    res.statusCode = 200;
    const myUserId = req.params.userId
    res.send(`Hello this is the page of ${myUserId.toUpperCase()}`)
})

//private username page
usersRouter.route('/:userId/dashboard')

.get((req, res, next) => {
    Users.findOne({where: req.body.username})
    .then(username => {
        res.statusCode = 200;
        const myUserId = req.params.userId
        if(myUserId === username){
            res.send(`Hello ${myUserId.toUpperCase()} this is your Dashboard!`)
        } else {
            const err = new Error('This username doen\'t\ exist')
            err.statusCode = 404
            return next(err)
        }
    }) .catch(err => next(err))
})

usersRouter.route('/:userId/settings')

.get((req, res) => {
    res.statusCode = 200;
    const myUserId = req.params.userId
    res.send(`Hello ${myUserId.toUpperCase()} these are your settings!`)
})

usersRouter.route('/:userId/logout')

.get((req, res) => {
    res.statusCode = 200;
    const myUserId = req.params.userId
    res.send(`You have logged out successfully, ${myUserId.toUpperCase()}`)
})

module.exports = usersRouter