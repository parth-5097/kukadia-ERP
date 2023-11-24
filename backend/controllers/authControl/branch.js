const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");

exports.addBranch = (req, res) => {
  let cc = req.body.countryCode;
  delete req.body.countryCode;

  connection.query(
    `INSERT INTO ${SQL.tables.branch} SET ?`,
    req.body,
    (error, data) => {
      if (error) {
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else {
        connection.query(
          `UPDATE ${SQL.tables.branch} SET branch_id="${cc}-${data.insertId}" WHERE id=${data.insertId}`,
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
                message: "Branch added",
              });
            }
          }
        );
      }
    }
  );
};

exports.getBranch = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;
  let val = req.query.id ? `WHERE FIND_IN_SET(id,"${req.query.id}")` : "";

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS *,'$100' AS totalSales,'$100' AS totalPurchase FROM ${SQL.tables.branch} ${val} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
    [parseInt(limit), parseInt(offset)],
    (error, data) => {
      if (error) {
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else if (data[0].length === 0) {
        res.json({
          statusCode: 404,
          success: false,
          message: "Records not found",
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

exports.updateBranch = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.branch} SET ? WHERE id=${req.params.id}`,
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
          message: "Branch updated successfully",
        });
      }
    }
  );
};

exports.deleteBranch = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.branch} WHERE id=${req.params.id}`,
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
          message: "Branch deleted",
        });
      }
    }
  );
};
