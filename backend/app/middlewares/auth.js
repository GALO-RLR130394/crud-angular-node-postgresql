"use strict";

//const i18n = require("i18n");
const jwt = require("jsonwebtoken");

const secret = process.env.APP_JWT_SECRET || "";

/**
 * Validate that the user is logged in.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 *
 * @return Response
 */
const isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message:"Unauthorized access.",
    });
  }

  const token = req.headers.authorization.replace(/['"]+/g, "");

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      const message = err.message;
      return res.status(403).send({
        message: message ||"Invalid token.",
      });
    }
    req.user = decoded.user;

    next();
  });
};

/**
 * Validate that a certain user is an administrator.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 *
 * @return Response
 */
const isSuperUser = (req, res, next) => {
  const { user } = req;

  if (user.role === "admin_sonoma") {
    next();
  } else {
    return res.status(403).send({
      message: i18n.__("Only administrative users can access this resource."),
    });
  }
};

/**
 * Validate that a certain user is an administrator company.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 *
 * @return Response
 */
const isCompAdmin = (req, res, next) => {
  const { user } = req;

  if (user.role === "admin_comp") {
    next();
  } else {
    return res.status(403).send({
      message: i18n.__("Only administrative users can access this resource."),
    });
  }
};

/**
 * Validate that a certain user is an administrator provider.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 *
 * @return Response
 */
const isProvAdmin = (req, res, next) => {
  const { user } = req;

  if (user.role === "admin_prov") {
    next();
  } else {
    return res.status(403).send({
      message: i18n.__("Only administrative users can access this resource."),
    });
  }
};

module.exports = {
  isAuth,
  isSuperUser,
  isCompAdmin,
  isProvAdmin
};