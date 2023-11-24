const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");

exports.addInventory = (req, res) => {
  connection.query(
    `INSERT INTO ${SQL.tables.inventory} SET ?`,
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
          message: "Inventory added successfully",
        });
      }
    }
  );
};

exports.getInventory = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  let price = req.query.price
    ? req.query.price == 0
      ? `ORDER BY avg_price ASC`
      : req.query.price == 1
      ? `ORDER BY avg_price DESC`
      : ``
    : ``;
  let cash_on_hand = req.query.coh
    ? req.query.coh == 0
      ? `ORDER BY on_hand ASC`
      : req.query.coh == 1
      ? `ORDER BY on_hand DESC`
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
    `SELECT SQL_CALC_FOUND_ROWS * FROM ${SQL.tables.inventory} ${price} ${created_at} ${cash_on_hand} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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

exports.updateInventory = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.inventory} SET ? WHERE id=${req.params.id}`,
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
          message: "Item updated",
        });
      }
    }
  );
};

exports.deleteInventory = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.inventory} WHERE id=${req.params.id}`,
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
          message: "Item deleted",
        });
      }
    }
  );
};
