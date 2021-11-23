const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const usersRouter = require('./routes/usersRouter');

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send('Hello this is CalenTask')
})

//middleware

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//routes
app.use('/users', usersRouter)

//port
app.listen(3001, () => console.log('Server is ready'))