const AuthorizationFailedError = require('./authorization-failed.error');
const DatabaseError = require('./database.error');
const ForbiddenError = require('./forbidden.error');
const ObjectNotFoundError = require('./object-not-found.error');
const ValidationError = require('./validation.error');
const InternalServerError = require('./internal-server.error')
const ObjectAlreadyExistError= require('./object-already-exist.error');

const exceptions = {
    AuthorizationFailedError,
    ForbiddenError,
    ObjectNotFoundError,
    ValidationError,
    DatabaseError,
    InternalServerError,
    ObjectAlreadyExistError,
};

module.exports = exceptions