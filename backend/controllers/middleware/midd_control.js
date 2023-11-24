const jwt = require("jsonwebtoken");
const { JWT, SQL } = require("../../config");
const connection = require("../../database/connect");

exports.randomFixedInteger = function (length) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};

exports.requireSignIn = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT.loginSecretKey, (error, data) => {
      if (error) {
        res.json({
          statusCode: 498,
          success: false,
          message: "Invalid token or user not found",
        });
      } else {
        req.user = data;
        connection.query(
          `SELECT id FROM ${SQL.tables.transactional.token} WHERE user_id=${req.user.id} AND FIND_IN_SET("${token}",${req.user.device_type})`,
          (error, data) => {
            if (error) {
              res.json({
                statusCode: 500,
                success: false,
                message: "Your token is not valid",
              });
            } else if (data.length == 0) {
              res.json({
                statusCode: 401,
                success: false,
                message:
                  "Your login session is expire or you have not register yet",
              });
            } else {
              next();
            }
          }
        );
      }
    });
  } else {
    res.json({
      statusCode: 499,
      success: false,
      message: "Authorization required",
    });
  }
};

exports.checkForPacketNumber = (req, res, next) => {
  if (
    req.body.type.toLowerCase() == "sale" ||
    req.body.type.toLowerCase() == "branch transfer"
  ) {
    if (req.body.packet_number) {
      next();
    } else {
      res.json({
        statusCode: 404,
        success: false,
        message: "Packet number is required",
      });
    }
  } else {
    next();
  }
};

exports.checkAdminAndSuper = (req, res, next) => {
  if (req.body.email || req.body.company_email) {
    req.user.acc_type.toLowerCase() == "super admin"
      ? next()
      : res.json({
          statusCode: 403,
          success: false,
          message: "You do not have super admin previliages to change emails",
        });
  } else {
    next();
  }
};
