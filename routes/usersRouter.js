const express = require('express');
//const passport = require('passport');
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
    console.log(req.body.password)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.send(`Hello ${req.user.username}`)
})

usersRouter.route('/login/forgot')

.get((req, res) => {
    res.statusCode = 200;
    res.send('You forgot your username/password')
})

usersRouter.route('/dashboard')

.get(authenticate.verifyUser,(req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.send(`Hello ${req.user.username} this is your Dashboard!`)
}) 

usersRouter.route('/settings')

.get(authenticate.verifyUser,(req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.send(`Hello ${req.user.username} these are your settings!`)
})

.put(authenticate.verifyUser,(req,res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    Users.update()
})

usersRouter.route('/logout')

.get(authenticate.verifyUser,(req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    req.session.destroy()
    res.clearCookie('sessionId')
    res.redirect('/')
})

module.exports = usersRouter