"use strict";

/**
 * Handler Error
 *
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
 
const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400) {
    return res.status(400).send({
      message:("Bad request"),
    });
  }

  res.status(err.status || 500).send({
    message: err.message ||("Internal server error"),
    error: {},
  });

  next();
};

module.exports = errorHandler;