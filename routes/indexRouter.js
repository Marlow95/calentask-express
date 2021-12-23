const express = require('express');
const indexRouter = express.Router()

indexRouter.route('/')

.get((req, res) => {
    res.statusCode = 200;
    res.json('Hello this is CalenTask')
})

module.exports = indexRouter;