var createError = require('http-errors');
var express = require("express");
var path = require('path');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var app = express();

// setup DB conneciton
const database = require('../database/db');

// auth
require('./auth/local');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// config/logging
if (process.env.NODE_ENV != 'production') {
    app.set('trust proxy', 'loopback');
    app.use(logger('short'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session setup for accounts
var sessionConfig = {
    secret: "for-development-only",
    store: new MySQLStore({}, database.conn),
    resave: false, // race condition
    saveUninitialized: false,
    name: "psded",
    cookie: {
        path: '/',
        httpOnly: process.env.NODE_ENV == 'development',
        secure: process.env.NODE_ENV == 'production',
        maxAge: null
    }
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.acc_id);
});

passport.deserializeUser(function(id, done) {
    database.selectAccountById(id).then(user => {
         if (!user)
            done(new Error("Account not found"));
        done(null, user);
    }).catch(err => {
        done(new Error("Account lookup error"));
    });
});

// setup static folders
app.use('/resources', express.static(path.join(__dirname, '../resources')));
app.use('/vendors', express.static(path.join(__dirname, '../vendors')));

// data middleware
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

// routers
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;