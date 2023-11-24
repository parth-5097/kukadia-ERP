const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");

exports.addTerms = (req, res) => {
  connection.query(
    `INSERT INTO ${SQL.tables.terms} SET ?`,
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
          message: "Inserted terms successfully",
        });
      }
    }
  );
};

exports.getTerms = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS * FROM ${SQL.tables.terms} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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
          message: "Success",
          totalRecords: data[1][0].totalRecords,
          data: data[0],
        });
      }
    }
  );
};

exports.editTerms = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.terms} SET ? WHERE id=${req.params.id}`,
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
          message: "Updated terms successfully",
        });
      }
    }
  );
};

exports.deleteTerms = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.terms} WHERE id=${req.params.id}`,
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
          message: "Updated terms successfully",
        });
      }
    }
  );
};
