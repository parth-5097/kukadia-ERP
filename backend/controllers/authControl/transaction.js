const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");

exports.addTransaction = (req, res) => {
  connection.query(
    `INSERT INTO ${SQL.tables.transaction} SET ?`,
    req.body,
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
          message: "Transaction added successfully",
        });
      }
    }
  );
};

exports.getTransaction = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS DATE(created_at) AS date,CONCAT("TR-",id) AS transaction,payee,account,memo,deposite,payment,balance FROM ${SQL.tables.transaction} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
    [parseInt(limit), parseInt(offset)],
    (error, data) => {
      if (error) {
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else if (data[0].length == 0) {
        res.json({
          statusCode: 404,
          success: false,
          message: "No records found",
        });
      } else {
        res.json({
          statusCode: 200,
          success: true,
          totalRecords: data[1][0].totalRecords,
          message: "Success",
          ending_balance: data[0].reduce((pre, cur) => {
            return pre + Number(cur.balance);
          }, 0),
          data: data[0],
        });
      }
    }
  );
};

exports.updateTransaction = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.transaction} SET ? WHERE id=${req.params.id}`,
    req.body,
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
          message: "Transaction updated",
        });
      }
    }
  );
};

exports.deleteTransaction = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.transaction} WHERE id=${req.params.id}`,
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
          message: "Transaction deleted",
        });
      }
    }
  );
};
