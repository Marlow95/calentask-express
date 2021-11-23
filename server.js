const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const usersRouter = require('./routes/usersRouter');

const app = express();

//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//main route
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send('Hello this is CalenTask')
})

//routes
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use((err, req, res, next) => {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};
  
// render the error page
res.status(err.status || 500);
res.render('error');
});
  
//port
app.listen(3001, () => console.log('Server is ready'))