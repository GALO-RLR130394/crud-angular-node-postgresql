"use strict";

const httpStatus = require("http-status-codes");
//const mongooseErrorHandler = require("mongoose-error-handler");

/**
 * Success Response
 *
 * @param {Object | String} body
 * @param {Object} res
 * @param {String} status 200
 */
const successResponse = (body, res, status = httpStatus.OK) => {
  res.status(status).send(body);
};

/**
 * Error Response
 *
 * @param {Error} error
 * @param {Response} res
 * @param {String} status 406
 */
const errorResponse = (error, res, status = httpStatus.NOT_ACCEPTABLE) => {
  res.status(status).send({
    message: handleError(error),
  });
};

/**
 * Handle ValidationError
 * @param {String|Error} error
 */
const handleError = (error) => {
  if (typeof error === "string") {
    return error;
  }

  if (error.name === "ValidationError") {
    return error
    /*return Object.keys(error.errors).map(
      (key) => error.errors[key].properties.message
    );*/
  }

  return error.message;
};

module.exports = {
  successResponse,
  errorResponse,
  handleError,
};
