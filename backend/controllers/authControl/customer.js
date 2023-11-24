const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");

exports.addCustomer = (req, res) => {
  connection.query(
    `INSERT INTO ${SQL.tables.customer} SET ?`,
    req.body,
    (error) => {
      if (error) {
        console.log(error);
        if (error.errno == 1062) {
          res.json({
            statusCode: 403,
            success: false,
            message: "Duplicate entry for this email",
          });
        } else {
          res.json({
            statusCode: 500,
            success: false,
            message: "Something went wrong",
          });
        }
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

exports.getCustmer = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS * FROM ${SQL.tables.customer} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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

exports.getCustomerById = (req, res) => {
  connection.query(
    `SELECT * FROM ${SQL.tables.customer} WHERE id=${req.params.id}`,
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
          message: "No record found for this id",
        });
      } else {
        res.json({
          statusCode: 200,
          success: true,
          data: data,
        });
      }
    }
  );
};

exports.editCustomer = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.customer} SET ? WHERE id=${req.params.id}`,
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
          message: "Updated successfully",
        });
      }
    }
  );
};

exports.deleteCustomer = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.customer} WHERE id=${req.params.id}`,
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

exports.searchCustomer = (req, res) => {
  if (req.query.search) {
    connection.query(
      `SELECT * FROM ${SQL.tables.customer} WHERE name LIKE '${req.query.search}%'`,
      (error, data) => {
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
            data: data,
          });
        }
      }
    );
  } else {
    res.json({
      statusCode: 404,
      success: false,
      message: "Type something",
    });
  }
};
