'use strict';

/**
 * Represents an unauthorized error
 * @param {string} [message] - Optional message
 * @constructor
 */
function UnauthorizedError(message) {
    this.message = message || 'You are not authorized to perform this action on this resource';
    this.stack = Error().stack;

    /**
     * HTTP status code
     * @type {number}
     */
    this.statusCode = 401;
}

UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.name = 'unauthorized';

module.exports.Unauthorized = UnauthorizedError;