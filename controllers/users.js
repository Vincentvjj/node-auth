'use strict';

var express = require('express');
var roles = require('../models/roles');
var authorize = require('./authorize');
var User = require('../models/user');

module.exports.Router = function() {
    var router = express.Router();

    router.get('/users/me', function(req, res) {
        res.json(req.user);
    });

    router.post('/users/impersonation', authorize.atLeast(roles.admin), function(req, res) {
        if (null != req.body.userId) {
            req.session.impersonatedUserId = req.body.userId;
            res.json({impersonating: req.body.userId});
        }
        else {
            delete req.session.impersonatedUserId;
            res.json({impersonating: null});
        }
    });

    return router;
};

module.exports.authenticate = function(username, password, done) {
    var user = User.getByName(username);
    if (user) {
        return done(null, user);
    }
    else {
        return done(null, false);
    }
};

module.exports.serialize = function(user, done) {
    return done(null, user.id);
};

module.exports.deserialize = function(id, done) {
    var user = User.getById(id);
    if (user) {
        return done(null, user);
    }
    else {
        return done(new Error('Invalid user ID attached to session!'));
    }
};

module.exports.impersonation = function(req, res, next) {
    if (undefined != req.session.impersonatedUserId) {
        var user = User.getById(req.session.impersonatedUserId);
        user._realUser = req.user;
        req.user = user;
    }
    next();
};
