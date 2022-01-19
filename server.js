const express = require('express');
const session = require('express-session')
const Redis = require('ioredis')
const connectRedis = require('connect-redis')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')
const bcrypt= require('bcrypt')
const multer = require('multer')
const authenticate = require('./config/authenticate')
const createError = require('http-errors')
const indexRouter = require('./routes/indexRouter')
const usersRouter = require('./routes/usersRouter');
const todoRouter = require('./routes/todoRouter')
const uploadRouter = require('./routes/uploadRouter');
const config = require('./config')

//Database
const sequelize = require('./config/database');

// Test Database
sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(err => console.log('Unable to connect to the database:' + err ))

const app = express();
const PORT = process.env.PORT || 4000;

//view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');


//MiddleWare
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use(express.static(__dirname + '/public'));

//Session Store
const RedisStore = connectRedis(session)
const redis = new Redis()


//Session
app.use(session({
    name: 'sessionId',
    store: new RedisStore({ 
        client: redis,
        disableTouch: true
    }),
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 //one day
    }
}))

app.use(passport.initialize())
app.use(passport.session())


//Routes
app.use('/api', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/todo', todoRouter)
app.use('/api/imageUpload', uploadRouter)


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