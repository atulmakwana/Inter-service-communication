class AuthorizationFailedError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthorizationFailedError);
    }

    this.name = 'AuthorizationFailed';
    this.httpStatusCode=401;
  }
}
module.exports=AuthorizationFailedError;