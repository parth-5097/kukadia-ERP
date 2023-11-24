const { SQL } = require("../../config");
const connection = require("../../database/connect");

exports.logout = (req, res) => {
  connection.query(
    `SELECT * FROM ${SQL.tables.users} WHERE id=${req.params.id}`,
    (error, data) => {
      if (error) {
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else if (data.length == 0) {
        res.json({
          statusCode: 404,
          success: false,
          message: "User not found",
        });
      } else {
        let device_type =
          data[0].device_type.length > 0
            ? data[0].device_type.match(req.body.device_type)
              ? data[0].device_type.replace(req.body.device_type, "")
              : null
            : null;
        if (device_type !== null) {
          connection.query(
            `UPDATE ${SQL.tables.users} SET login_status=FALSE,device_type="${device_type}" WHERE id=${data[0].id}`,
            (error) => {
              if (error) {
                res.json({
                  statusCode: 500,
                  success: false,
                  message: "Something went wrong",
                });
              } else {
                res.json({
                  statusCode: 200,
                  success: true,
                  message: `Successfully logged out from ${req.body.device_type} device`,
                });
              }
            }
          );
        } else {
          res.json({
            statusCode: 401,
            success: false,
            message:
              "First login with this account or check your current device type",
          });
        }
      }
    }
  );
};
