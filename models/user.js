'use strict';

var _ = require('lodash');
var roles = require('./roles');

var testUsers = [
    {id: 1, name: 'admin', role: roles.admin},
    {id: 2, name: 'student', role: roles.student},
    {id: 3, name: 'observer', role: roles.observer}
];

function User(props) {
    _.assign(this, props);
}

User.getById = function(id) {
    var user = _.find(testUsers, {id: id});
    if (user) {
        return new User(user);
    }
    else {
        return undefined;
    }
};

User.getByName = function(name) {
    var user = _.find(testUsers, {name: name});
    if (user) {
        return new User(user);
    }
    else {
        return undefined;
    }
};

module.exports = User;