'use strict';

var crypto = require('crypto');
var express = require("express");
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');

var usersController = require('./controllers/users');

var port = process.env.PORT || 3000;

var app = express();
app.use(morgan('dev'));
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: crypto.randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: false
    //note that in production you should use Redis for your session store
    //not the default memory session store
    //see https://github.com/expressjs/session#sessionoptions
    //and you should set cookie: {secure: true} if your
    //server supports HTTPS
}));

passport.serializeUser(usersController.serialize);
passport.deserializeUser(usersController.deserialize);
passport.use(new LocalStrategy(usersController.authenticate));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), function(req, res) {
    console.log('authenticated as:');
    console.log(req.user);
    res.redirect('/home');
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.use(express.static(__dirname + '/static/public'));

app.use(function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/')
    }
});

app.use(usersController.impersonation);

app.use(express.static(__dirname + '/static/secure'));

//mount all the API controllers under '/api'
var apiControllers = require('./controllers/api-controllers');
app.use('/api', apiControllers.Router());
app.use(apiControllers.apiErrorHandler);

app.listen(port, function() {
    console.log('listening for requests on http://localhost:' + port);
});
