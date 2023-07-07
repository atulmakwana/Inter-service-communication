class ObjectAlreadyExistError extends Error {
    constructor(...params) {
      super(...params);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ObjectAlreadyExistError);
      }
  
      this.name = 'ObjectAlreadyExist';
      this.httpStatusCode=400;
    }
  }
  module.exports=ObjectAlreadyExistError;