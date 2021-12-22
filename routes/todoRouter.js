const express = require('express');
const authenticate = require('../config/authenticate')
const todoRouter = express.Router()
const Todo = require('../model/TodoModel')


todoRouter.route('/')

.get((req, res, next) => {
    Todo.findAll()
    .then(todo => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.send(todo)
    }).catch( err => next(err));

})

.post((req, res, next) => {
    Todo.create({ 
        description: req.body.description
    })
    .then(todo => {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json')
        res.json(todo)
    }).catch(err => next(err))
})

.put((req, res) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json')
    res.end(`PUT operation not supported on /todo/`)
})

.delete((req, res) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json')
    res.end(`DELETE operation not supported on /todo/`)
})

todoRouter.route('/:todoId')
.get((req, res, next) => {
    Todo.findOne({where: {todoId: req.params.todoId}})
    .then(todo => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.send(todo)
    }).catch( err => next(err));
})

.post((req, res) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json')
    res.end(`POST operation not supported on /todo/${req.params.todoId}`)
})

.put((req, res, next) => {
   Todo.update({description: req.body.description},{where: {todoId: req.params.todoId}})
    .then(todo => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(todo)
    })
    .catch(err => next(err))
})

.delete((req,res,next) => {
    Todo.destroy({where:{todoId: req.params.todoId}})
    .then(todo => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(todo)
    })
    .catch(err => next(err))
})


module.exports = todoRouter