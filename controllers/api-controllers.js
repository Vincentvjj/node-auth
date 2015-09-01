/**
 * Created by dave on 8/31/15.
 */

'use strict';

var express = require('express');

module.exports.Router = function() {
    var router = express.Router();

    router.use(require('./users').Router());
    router.use(require('./roles').Router());
    //other API routers...

    return router;
};

module.exports.apiErrorHandler = function(err, req, res, next) {
    if (err.stack) {
        console.err(err.stack);
    }
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json(err);
};