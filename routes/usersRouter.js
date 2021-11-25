const express = require('express');
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

.get((req, res) => {
    res.statusCode = 200;
    res.send('You can sign up')
})

usersRouter.route('/login')

.get((req, res) => {
    res.statusCode = 200;
    res.send('You can login')
})

usersRouter.route('/login/forgot-password')

.get((req, res) => {
    res.statusCode = 200;
    res.send('You forgot your password')
})

usersRouter.route('/login/forgot-username')

.get((req, res) => {
    res.statusCode = 200;
    res.send('You forgot your username')
})


usersRouter.route('/:userId')

.get((req, res) => {
    res.statusCode = 200;
    const myUserId = req.params.userId
    res.send(`Hello ${myUserId.toUpperCase()}`)
})

usersRouter.route('/:userId/dashboard')

.get((req, res) => {
    res.statusCode = 200;
    const myUserId = req.params.userId
    res.send(`Hello ${myUserId.toUpperCase()} this is your Dashboard!`)
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