const bcrypt = require("bcrypt");

const { SQL } = require("../../config");
const connection = require("../../database/connect");

exports.register = (req, res) => {
  let value = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    acc_type: req.body.acc_type,
  };
  connection.query(
    `SELECT id FROM ${SQL.tables.users} WHERE email="${value.email}"`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Something went wrong",
        });
      } else if (data.length === 0) {
        connection.query(
          `INSERT INTO ${SQL.tables.users} SET ?`,
          value,
          (error) => {
            if (error) {
              res.json({
                success: false,
                message: "Something went wrong",
              });
            } else {
              res.json({
                success: true,
                message: "Register successfully",
              });
            }
          }
        );
      } else {
        res.json({
          success: false,
          message: "Your account is already register",
        });
      }
    }
  );
};

exports.deleteRegisteredUser = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.users} WHERE id=${req.params.id}`,
    (error) => {
      if (error) {
        res.json({
          statusCode: 500,
          success: false,
          messagea: "Something went wrong",
        });
      } else {
        req.app.get("socketService").emitAny(req.params.id, "ACCOUNT_DELETED", {
          acc_id: req.params.id,
        });
        res.json({
          statusCode: 200,
          success: true,
          message: "Account deleted",
        });
      }
    }
  );
};
