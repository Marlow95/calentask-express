const express = require('express');
const usersRouter = express.Router()

usersRouter.route('/')

.get((req, res) => {
    res.statusCode = 200;
    res.send('Hello User')
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

usersRouter.route('/:userId/logout')

.get((req, res) => {
    res.statusCode = 200;
    const myUserId = req.params.userId
    res.send(`You have logged out successfully, ${myUserId.toUpperCase()}`)
})

module.exports = usersRouter