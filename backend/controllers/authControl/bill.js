const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");
const { exportToPdf } = require("../../handlers/export");

//add INVOICE pending
exports.addBill = (req, res) => {
  req.body.buyer
    ? (req.body.bill_to = req.body.buyer && delete req.body.buyer)
    : req.body;
  req.body.consignee
    ? (req.body.ship_to = req.body.consignee && delete req.body.consignee)
    : req.body;
  connection.query(
    `INSERT INTO ${SQL.tables.bill} SET ?`,
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
          message: "Bill added",
        });
      }
    }
  );
};

exports.getLocalBill = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS id,vendor_name,date,invoice_id,p_o_number,terms,ship,bill_to AS buyer,ship_to AS consignee,via,f_o_b,rep,broker,brokerage FROM ${SQL.tables.bill} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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
          data: data[0],
        });
      }
    }
  );
};

exports.getIntraStateBill = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS id,vendor_name,date,invoice_id,p_o_number,terms,ship,bill_to,ship_to,via,f_o_b,rep,broker,brokerage FROM ${SQL.tables.bill} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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
          data: data[0],
        });
      }
    }
  );
};

exports.getExportBill = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS * FROM ${SQL.tables.bill} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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
          data: data[0],
        });
      }
    }
  );
};

exports.setBillTemplateValue = (req, res, next) => {
  connection.query(
    `SELECT t1.invoice_id,t1.branch_id,t1.date,t1.due_date,t2.address,t2.phone_no,t2.email,t2.state,t2.name,t2.tin_no,t2.pancard_no,t2.gst_no,t2.ein_no,t2.tax_id,t3.bank_name,t3.account_name,t3.account_no,t3.ifsc_code,t3.swift_code,t4.email AS customer_email,t4.phone_no AS customer_phone,t4.billing_address AS customer_address FROM ${SQL.tables.invoice} t1 LEFT JOIN ${SQL.tables.company} t2 ON t1.branch_id=t2.id LEFT JOIN ${SQL.tables.bank} t3 ON t3.id=SUBSTRING_INDEX(t2.bank_id, ',', 1) LEFT JOIN ${SQL.tables.customer} t4 ON t1.customer_id=t4.id WHERE t1.id=${req.params.id};
    SELECT * FROM ${SQL.tables.invoice_product} WHERE invoice_id=${req.params.id}`,
    (error, data) => {
      if (error) {
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else if (data[0].length == 0 && data[1].length == 0) {
        res.json({
          statusCode: 404,
          success: false,
          message: "No records found",
        });
      } else {
        req.invoice = data[0][0];
        req.product = data[1];
        next();
      }
    }
  );
};

exports.sendBillWithPdf = (req, res) => {
  ejs
    .renderFile(`views/invoice/bill_email.ejs`, {
      invoice: req.invoice,
      product: req.product,
    })
    .then((data) => {
      exportToPdf(data)
        .then((data) => {
          res.json({
            statusCode: 200,
            success: true,
            data: data,
          });
        })
        .catch((err) => {
          console.log(err);
          res.json({
            statusCode: 500,
            success: false,
            message: "Can not make pdf at the moment, try after sometimes",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        statusCode: 500,
        success: false,
        message: "Can not make pdf at the moment, try after sometimes",
      });
    });
};

exports.editBill = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.bill} SET ? WHERE id=${req.params.id}`,
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

exports.deleteBill = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.bill}  WHERE id=${req.params.id}`,
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

exports.getMBill = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;
  let date =
    req.query.start_date && req.query.end_date
      ? req.query.start_date
        ? `WHERE date BETWEEN '${req.query.start_date}' AND CURDATE()`
        : `WHERE date BETWEEN '${req.query.start_date}' AND '${req.query.end_date}'`
      : ``;
  let sub_amount = req.query.sub_amount
    ? req.query.sub_amount == 0
      ? `ORDER BY sub_amount ASC`
      : req.query.sub_amount == 1
      ? `ORDER BY sub_amount DESC`
      : ``
    : ``;
  let total_amount = req.query.total_amount
    ? req.query.total_amount == 0
      ? `ORDER BY total_amount ASC`
      : req.query.total_amount == 1
      ? `ORDER BY total_amount DESC`
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
    `SELECT SQL_CALC_FOUND_ROWS * FROM ${SQL.tables.bill} ${date} ${sub_amount} ${total_amount} ${created_at} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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
          data: data[0],
        });
      }
    }
  );
};
