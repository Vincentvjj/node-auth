'use strict';

var express = require('express');
var roles = require('../models/roles');

module.exports.Router = function() {
    var router = express.Router();

    router.get('/roles', function(req, res) {
        res.json(roles);
    });

    return router;
};
