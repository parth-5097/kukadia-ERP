const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");

exports.getDateofMonth = (month) => {
  let d = new Date();
  d.setMonth(d.getMonth() - month);
  return d.toISOString().split("T")[0];
};

exports.getProfitLoss = (req, res) => {
  let d = new Date();
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;
  let date = req.query.month
    ? `WHERE DATE(created_at) BETWEEN ${this.getDateofMonth(
        req.query.month
      )} AND ${d.toISOString().split("T")[0]}`
    : req.query.start_date && req.query.end_date
    ? `WHERE DATE(created_at) BETWEEN ${req.query.start_date} AND ${req.query.end_date}`
    : ``;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS branch_name,@totalIncome:=LPAD(FLOOR(RAND() * 999999.99), 6, '0') AS totalIncome,@totalExpense:=LPAD(FLOOR(RAND() * 999999.99), 6, '0') AS totalExpense,(@totalIncome - @totalExpense) AS PL FROM ${SQL.tables.company} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
    [parseInt(limit), parseInt(offset)],
    (error, data) => {
      if (error) {
        console.log(error);
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else if (data[0].length === 0) {
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
          company_income: data[0].reduce((sum, el) => sum - -el.totalIncome, 0),
          company_expense: data[0].reduce(
            (sum, el) => sum - -el.totalExpense,
            0
          ),
        });
      }
    }
  );
};

exports.getBalanceSheet = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS name,@totalLiability:=LPAD(FLOOR(RAND() * 999999.99), 6, '0') AS totalLiability,@totalAssets:=LPAD(FLOOR(RAND() * 999999.99), 6, '0') AS totalAssets,(@totalLiability + @totalAssets) AS availableBalance FROM ${SQL.tables.branch} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
    [parseInt(limit), parseInt(offset)],
    (error, data) => {
      if (error) {
        console.log(error);
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else if (data[0].length === 0) {
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
