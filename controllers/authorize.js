/**
 * Created by dave on 8/31/15.
 */

'use strict';

var errors = require('./errors');

module.exports.atLeast = function(role) {
    return function(req, res, next) {
        var user = req.user._realUser || req.user;
        if (user.role >= role) {
            return next();
        }
        else {
            return next(new errors.Unauthorized());
        }
    }
};
