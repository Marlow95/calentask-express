const express = require('express');
const session = require('express-session')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const createError = require('http-errors')
const indexRouter = require('./routes/indexRouter')
const usersRouter = require('./routes/usersRouter');

//Database
const sequelize = require('./config/database');

// Test Database
sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(err => console.log('Unable to connect to the database:' + err ))

const app = express();
const PORT = process.env.PORT || 3002;

//Middleware
//app.use(session({
    //'secret':'kMbr45F6h4gf7kbr5'
//}))
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use(express.static(__dirname + '/public'));

//Routes
app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
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
app.listen(PORT, () => console.log(`Server is ready on ${PORT}`))