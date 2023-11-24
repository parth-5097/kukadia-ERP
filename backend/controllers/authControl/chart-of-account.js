const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");

exports.addChartOfAccount = (req, res) => {
  connection.query(
    `INSERT INTO ${SQL.tables.chart_of_account} SET ?`,
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
          message: "Chart of account added successfully",
        });
      }
    }
  );
};

exports.getChartOfAccount = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;
  let date_amount =
    req.query.end_date &&
    req.query.start_date &&
    req.query.min_amount &&
    req.query.max_amount
      ? `WHERE balance BETWEEN ${req.query.min_amount} AND ${req.query.max_amount} AND created_at BETWEEN '${req.query.start_date}' AND '${req.query.end_date}'`
      : req.query.start_date && req.query.min_amount && req.query.max_amount
      ? `WHERE balance BETWEEN ${req.query.min_amount} AND ${req.query.max_amount} AND created_at BETWEEN '${req.query.start_date}' AND CURDATE()`
      : req.query.start_date && req.query.end_date
      ? `WHERE created_at BETWEEN '${req.query.start_date}' AND '${req.query.end_date}'`
      : req.query.start_date
      ? `WHERE created_at BETWEEN '${req.query.start_date}' AND CURDATE()`
      : req.query.min_amount && req.query.max_amount
      ? `WHERE balance BETWEEN ${req.query.min_amount} AND ${req.query.max_amount}`
      : ``;
  let id = req.query.id
    ? req.query.id == 0
      ? `ORDER BY id ASC`
      : req.query.id == 1
      ? `ORDER BY id DESC`
      : ``
    : ``;
  let amount = req.query.amount
    ? req.query.amount == 0
      ? `ORDER BY balance ASC`
      : req.query.amount == 1
      ? `ORDER BY balance DESC`
      : ``
    : ``;
  let created_at = req.query.date
    ? req.query.date == 0
      ? `ORDER BY created_at ASC`
      : req.query.date == 1
      ? `ORDER BY created_at DESC`
      : ``
    : ``;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS * FROM ${SQL.tables.chart_of_account} ${date_amount} ${id} ${amount} ${created_at} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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
          data: data[0],
        });
      }
    }
  );
};

exports.updateChartOfAccount = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.chart_of_account} SET ? WHERE id=${req.params.id}`,
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
          message: "Updated",
        });
      }
    }
  );
};

exports.deleteChartOfAccount = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.chart_of_account} WHERE id=${req.params.id}`,
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
          message: "Deleted successfully",
        });
      }
    }
  );
};
