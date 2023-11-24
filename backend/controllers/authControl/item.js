const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");
const { randomFixedInteger } = require("../middleware/midd_control");

exports.addItem = (req, res) => {
  let number = randomFixedInteger(6);

  req.body.type = req.body.type.toLowerCase();
  req.body.description = `${req.body.type} order from ${req.body.from} to ${req.body.to} of ${req.body.stock} for price of ${req.body.price}`;
  req.body.rel_id =
    req.body.type.toLowerCase() == "purchase"
      ? `P-${number}`
      : req.body.type.toLowerCase() == "sale"
      ? `S-${number}`
      : `BT-${number}`;
  req.body.packet_number =
    req.body.type.toLowerCase() == "purchase"
      ? `P-${number}`
      : req.body.packet_number;

  connection.query(
    `INSERT INTO ${SQL.tables.item} SET ?`,
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
          message: "Item added",
        });
      }
    }
  );
};

exports.getItem = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;
  let branch = req.query.branch
    ? `WHERE order_from IN (SELECT name FROM ${SQL.tables.branch} WHERE id=${req.query.branch})`
    : "";

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS * FROM ${SQL.tables.item} ${branch} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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
          message: "No record found",
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

exports.updateItem = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.item} SET ? WHERE id=${req.params.id}`,
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

exports.deleteItem = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.item} WHERE id=${req.params.id}`,
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
