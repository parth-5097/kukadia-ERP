const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../../database/connect");
const { SQL, JWT } = require("../../config");

exports.login = (req, res) => {
  connection.query(
    `SELECT id,acc_type,device_type,password,(SELECT ${req.body.device_type} FROM ${SQL.tables.transactional.token} WHERE user_id=t1.id) AS token FROM ${SQL.tables.users} t1 WHERE email="${req.body.email}"`,
    (error, data) => {
      if (error) {
        console.log(error);
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else if (data.length === 0) {
        res.json({
          statusCode: 404,
          success: false,
          message:
            "First signup with valid details or check your login credential",
        });
      } else {
        req.body.device_type = req.body.device_type.toLowerCase();
        let device_type =
          data[0].device_type.length > 0
            ? data[0].device_type.match(req.body.device_type)
              ? data[0].device_type
              : data[0].device_type + " " + req.body.device_type
            : req.body.device_type;

        if (bcrypt.compareSync(req.body.password, data[0].password) === true) {
          const token = jwt.sign(
            {
              id: data[0].id,
              device_type: req.body.device_type,
              acc_type: req.body.acc_type,
            },
            JWT.loginSecretKey
          );
          let arr = data[0].token
            ? data[0].token.match(",")
              ? data[0].token.split(",")
              : []
            : [];

          data[0].token = req.body.device_type.toLowerCase().match("desktop")
            ? data[0].token
              ? data[0].token.match(",")
                ? arr.shift() && arr.push(token) && arr.join(",")
                : data[0].token.length > 0
                ? data[0].token + "," + token
                : token
              : token
            : token;

          connection.query(
            `UPDATE ${SQL.tables.users} SET login_status=TRUE,fcm_token="${req.body.fcm_token}",device_type="${device_type}" WHERE id=${data[0].id}; 
              INSERT INTO ${SQL.tables.transactional.token} SET ? ON DUPLICATE KEY UPDATE ?;
              SELECT id,avatar,first_name,last_name,email,mobile_no,acc_type FROM ${SQL.tables.users} WHERE id=${data[0].id}`,
            [
              {
                user_id: data[0].id,
                [req.body.device_type]: data[0].token,
              },
              {
                [req.body.device_type]: data[0].token,
              },
            ],
            (error, data) => {
              if (error) {
                console.log(error);
                res.json({
                  statusCode: 500,
                  success: false,
                  message: "Something went wrong",
                });
              } else {
                data[2][0].token = token;
                res.json({
                  statusCode: 200,
                  success: true,
                  data: data[2][0],
                  message: "Logged in",
                });
              }
            }
          );
        } else {
          res.json({
            statusCode: 200,
            success: false,
            message: "Invalid login credential",
          });
        }
      }
    }
  );
};
