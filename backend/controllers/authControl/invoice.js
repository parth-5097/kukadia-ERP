const ejs = require("ejs");

const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");
const { exportToPdf } = require("../../handlers/export");
const { single_file_upload_handler } = require("../../handlers/image");
const { mail } = require("../../handlers/mail");

exports.addInvoice = (req, res) => {
  req.body.buyer
    ? (req.body.bill_to = req.body.buyer && delete req.body.buyer)
    : req.body;
  req.body.consignee
    ? (req.body.ship_to = req.body.consignee && delete req.body.consignee)
    : req.body;

  connection.query(
    `INSERT INTO ${SQL.tables.invoice} SET ?`,
    req.body,
    (error, data) => {
      if (error) {
        console.log(error);
        if (error.errno == 1062) {
          res.json({
            statusCode: 403,
            success: false,
            message: "Duplicate entry for this invoice",
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
          insert_id: data.insertId,
          message: "Invoice added",
        });
        req.app.get("socketService").broadcastAll("UPDATED_INVOICE_NUMBER", {
          id: req.body.invoice_id,
          branch_id: req.body.branch_id,
        });
      }
    }
  );
};

exports.duplicateInvoiceHandler = (req, res, next) => {
  req.body.buyer
    ? (req.body.bill_to = req.body.buyer && delete req.body.buyer)
    : req.body;
  req.body.consignee
    ? (req.body.ship_to = req.body.consignee && delete req.body.consignee)
    : req.body;

  connection.query(
    `INSERT INTO ${SQL.tables.invoice} SET ?`,
    req.body,
    (error, data) => {
      if (error) {
        console.log(error);
        if (error.errno == 1062) {
          req.body.invoice_id += 1;
          next();
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
          insert_id: data.insertId,
          message: "Invoice added",
        });
        req.app.get("socketService").broadcastAll("UPDATED_INVOICE_NUMBER", {
          id: req.body.invoice_id,
          branch_id: req.body.branch_id,
        });
      }
    }
  );
};

exports.getInvoiceById = (req, res) => {
  connection.query(
    `SELECT t1.*,t2.name,t2.email,t2.phone_no,t2.billing_address,t2.shipping_address,t2.website,t2.company_name,t2.notes,t2.sub_customer,'15-20' AS average,'$40000' AS sub_amount,'$80000' AS total_amount FROM ${SQL.tables.invoice} t1 INNER JOIN ${SQL.tables.customer} t2 ON t1.customer_id=t2.id WHERE t1.id=${req.params.id}`,
    (error, data) => {
      if (error) {
        console.log(error);
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

exports.getLocalInvoice = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS id,vendor_name,date,invoice_id,p_o_number,terms,ship,bill_to AS buyer,ship_to AS consignee,via,f_o_b,rap,broker,brokerage,status,currency,amount FROM ${SQL.tables.invoice} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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

exports.getIntraStateInvoice = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS id,vendor_name,date,invoice_id,p_o_number,terms,ship,bill_to,ship_to,via,f_o_b,rap,broker,brokerage,status,currency,amount FROM ${SQL.tables.invoice} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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

exports.getExportInvoice = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS * FROM ${SQL.tables.invoice} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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

exports.editInvoice = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.invoice} SET ? WHERE id=${req.params.id}`,
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

exports.deleteInvoice = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.invoice}  WHERE id=${req.params.id}`,
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

exports.getMInvoice = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;
  let filter =
    req.query.start_date && !req.query.status
      ? !req.query.end_date
        ? `WHERE t1.date BETWEEN '${req.query.start_date}' AND CURDATE()`
        : `WHERE t1.date BETWEEN '${req.query.start_date}' AND '${req.query.end_date}'`
      : req.query.start_date && req.query.status
      ? !req.query.end_date && req.query.status !== "all"
        ? `WHERE t1.status='${req.query.status}' AND t1.date BETWEEN '${req.query.start_date}' AND CURDATE()`
        : req.query.end_date && req.query.status !== "all"
        ? `WHERE t1.status='${req.query.status}' AND t1.date BETWEEN '${req.query.start_date}' AND '${req.query.end_date}'`
        : !req.query.end_date
        ? `WHERE t1.date BETWEEN '${req.query.start_date}' AND CURDATE()`
        : `WHERE t1.date BETWEEN '${req.query.start_date}' AND '${req.query.end_date}'`
      : req.query.status && req.query.status !== "all"
      ? `WHERE t1.status='${req.query.status}'`
      : ``;
  let amount = req.query.amount
    ? req.query.amount == 0
      ? `ORDER BY t1.amount ASC`
      : req.query.amount == 1
      ? `ORDER BY t1.amount DESC`
      : ``
    : ``;
  let created_at = req.query.date
    ? req.query.date == 0
      ? `ORDER BY created_at ASC`
      : req.query.date == 1
      ? `ORDER BY created_at DESC`
      : ``
    : ``;
  let due_date = req.query.due_date
    ? req.query.due_date == 0
      ? `ORDER BY due_date ASC`
      : req.query.due_date == 1
      ? `ORDER BY due_date DESC`
      : ``
    : ``;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS t1.*,t2.name,t2.email,t2.phone_no,t2.billing_address,t2.shipping_address,t2.website,t2.company_name,t2.notes,t2.sub_customer,'15-20' AS average,'$40000' AS sub_amount,'$80000' AS total_amount FROM ${SQL.tables.invoice} t1 INNER JOIN ${SQL.tables.customer} t2 ON t1.customer_id=t2.id ${filter} ${amount} ${due_date} ${created_at} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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

exports.getLatestInvoiceId = (req, res) => {
  connection.query(
    `SELECT MAX(invoice_id) AS invoice_id FROM ${SQL.tables.invoice} WHERE branch_id=${req.params.branch_id}`,
    (error, data) => {
      if (error) {
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else {
        data[0].invoice_id =
          data[0].invoice_id == null ? 0 : data[0].invoice_id;
        res.json({
          statusCode: 200,
          success: true,
          data: data,
        });
      }
    }
  );
};

exports.changeInvoiceStatus = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.invoice} SET status='${req.body.status}' WHERE id=${req.params.id}`,
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
          message: `Status changed to ${req.query.status}`,
        });
      }
    }
  );
};

exports.batchDeleteInvoice = (req, res) => {
  if (req.query.id) {
    connection.query(
      `DELETE FROM ${SQL.tables.invoice} WHERE FIND_IN_SET(id,"${req.query.id}")`,
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
            message: `Invoice deleted successfully`,
          });
        }
      }
    );
  } else {
    res.json({
      statusCode: 404,
      success: false,
      message: "Provide id for deleting invoice",
    });
  }
};

exports.sendReminderInvoice = (req, res) => {
  let mailDetails = {
    from: process.env.MAIL_USER,
    to: req.body.email,
    subject: `Reminder for Invoice KVPL-${req.body.invoice.branch_id}-${req.body.invoice.invoice_id} for Amount = ${req.body.invoice.amount}`,
    html: `<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
      </head>
      <body class="">
        <pre>This is Reminder mail for invoice and your due date is ${req.body.invoice.due_date}</pre>
      </body>
    </html>`,
  };
  mail(mailDetails)
    .then((res) => {
      res.json({
        statusCode: 200,
        success: true,
        message: "Reminder send successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        statusCode: 500,
        success: false,
        message:
          "Failed to send reminder at the moment, please try after sometimes",
      });
    });
};

exports.attachmentinNewInvoice = (req, res) => {
  single_file_upload_handler(req.files[Object.keys(req.files)[0]])
    .then((data) => {
      res.json({
        statusCode: 200,
        success: true,
        fileUrl: data,
      });
    })
    .catch((err) => {
      res.json({
        statusCode: err.code,
        success: false,
        message: err.msg,
      });
    });
};

exports.addInvoiceProduct = (req, res) => {
  connection.query(
    `INSERT INTO ${SQL.tables.invoice_product} SET ?`,
    req.body,
    (error, data) => {
      if (error) {
        console.log(error);
        if (error.errno == 1062) {
          res.json({
            statusCode: 403,
            success: false,
            message: "Duplicate entry for this invoice product",
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
          product_id: data.insertId,
        });
      }
    }
  );
};

exports.getInvoiceProduct = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS * FROM ${SQL.tables.invoice_product} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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

exports.getInvoiceProductById = (req, res) => {
  connection.query(
    `SELECT * FROM ${SQL.tables.invoice_product} WHERE invoice_id=${req.params.id}`,
    (error, data) => {
      if (error) {
        console.log(error);
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else if (data.length == 0) {
        res.json({
          statusCode: 404,
          success: false,
          message: "No records found",
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

exports.getProductByCustomer = (req, res) => {
  connection.query(
    `SELECT * FROM ${SQL.tables.invoice_product} WHERE invoice_id IN (SELECT id FROM ${SQL.tables.invoice} WHERE customer_id=${req.params.id})`,
    (error, data) => {
      if (error) {
        console.log(error);
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else if (data.length == 0) {
        res.json({
          statusCode: 404,
          success: false,
          message: "No records found",
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

exports.editInvoiceProduct = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.invoice_product} SET ? WHERE id=${req.params.id}`,
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
          message: "Product edited successfully",
        });
      }
    }
  );
};

exports.deleteInvoiceProduct = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.invoice_product} WHERE id=${req.params.id}`,
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
          message: "Product deleted",
        });
      }
    }
  );
};

exports.updateInvoiceIdInProduct = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.invoice_product} WHERE invoice_id IS NULL;
  UPDATE ${SQL.tables.invoice_product} SET invoice_id=${req.body.invoice_id} WHERE FIND_IN_SET(id,"${req.body.product_id}")`,
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
          message: "Invoice Updated",
        });
      }
    }
  );
};

exports.setInvoiceTemplateValue = (req, res, next) => {
  connection.query(
    `SELECT t1.invoice_id,t1.branch_id,t1.date,t1.due_date,t2.address,t2.phone_no,t2.email,t2.state,t2.name,t2.tin_no,t2.pancard_no,t2.gst_no,t2.ein_no,t2.tax_id,t3.bank_name,t3.account_name,t3.account_no,t3.ifsc_code,t3.swift_code,t4.email AS customer_email,t4.phone_no AS customer_phone,t4.billing_address AS customer_address,t1.created_at,t1.updated_at FROM ${SQL.tables.invoice} t1 LEFT JOIN ${SQL.tables.company} t2 ON t1.branch_id=t2.id LEFT JOIN ${SQL.tables.bank} t3 ON t3.id=SUBSTRING_INDEX(t2.bank_id, ',', 1) LEFT JOIN ${SQL.tables.customer} t4 ON t1.customer_id=t4.id WHERE t1.id=${req.params.id};
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

exports.invoiceEmailWithTemplate = (req, res, next) => {
  if (req.body.email) {
    ejs
      .renderFile(`views/invoice/invoice_email.ejs`, {
        invoice: req.invoice,
        product: req.product,
      })
      .then((data) => {
        req.mailDetails = {
          from: process.env.MAIL_USER,
          to: req.body.email,
          subject: `Kukadia ERP Invoice`,
          html: data,
        };
        next();
      })
      .catch((error) => {
        console.log(error);
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      });
  } else {
    res.json({
      statusCode: 403,
      success: false,
      message: "Please provide email",
    });
  }
};

exports.sendInvoiceOnEmail = (req, res) => {
  mail(req.mailDetails)
    .then((data) => {
      res.json({
        statusCode: 200,
        success: true,
        message: "Invoice send successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        statusCode: 500,
        success: false,
        message: "Can not send invoice right now, try after sometimes",
      });
    });
};

exports.sendInvoiceWithPdf = (req, res) => {
  ejs
    .renderFile(`views/invoice/invoice_email.ejs`, {
      invoice: req.invoice,
      product: req.product,
    })
    .then((data) => {
      exportToPdf(
        data,
        `invoice_${req.invoice.invoice_id}_${
          req.invoice.updated_at != null
            ? new Date(req.invoice.updated_at).toISOString()
            : new Date(req.invoice.created_at).toISOString()
        }`
      )
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
