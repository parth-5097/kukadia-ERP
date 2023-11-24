const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");

exports.addSalesOrder = (req, res) => {
  connection.query(
    `INSERT INTO ${SQL.tables.sales_order} SET ?`,
    req.body,
    (error) => {
      if (error) {
        console.log(error);
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else {
        res.json({
          statusCode: 200,
          success: true,
          message: "Inserted successfully",
        });
      }
    }
  );
};

exports.getSalesOrder = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;
  let status = req.query.status ? `WHERE status=${req.query.status}` : ``;
  let id = req.query.id
    ? req.query.id == 0
      ? `ORDER BY id ASC`
      : req.query.id == 1
      ? `ORDER BY id DESC`
      : ``
    : ``;
  let amount = req.query.amount
    ? req.query.amount == 0
      ? `ORDER BY amount ASC`
      : req.query.amount == 1
      ? `ORDER BY amount DESC`
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
    `SELECT SQL_CALC_FOUND_ROWS * FROM ${SQL.tables.sales_order} ${status} ${id} ${amount} ${created_at} LIMIT ? OFFSET ? ;SELECT FOUND_ROWS() AS totalRecords`,
    [parseInt(limit), parseInt(offset)],
    (error, data) => {
      if (error) {
        console.log(error);
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
          data: data[0],
        });
      }
    }
  );
};

exports.editSalesOrder = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.sales_order} SET ? WHERE id=${req.params.id}`,
    (error) => {
      if (error) {
        console.log(error);
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else {
        res.json({
          statusCode: 200,
          success: true,
          message: "Updated successfully",
        });
      }
    }
  );
};

exports.deleteSalesOrder = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.purchase_order} WHERE id=${req.params.id}`,
    (error) => {
      if (error) {
        console.log(error);
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
