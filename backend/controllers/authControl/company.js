const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");
const { single_image_handler } = require("../../handlers/image");

exports.addCompany = (req, res) => {
  connection.query(
    `INSERT INTO ${SQL.tables.bank} SET ?`,
    req.body.bank_data,
    (error, data) => {
      if (error) {
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else {
        req.body.company_data.bank_id = data.insertId;
        req.body.company_data.city = req.body.company_data.city
          ? JSON.stringify(req.body.company_data.city)
          : null;
        req.body.company_data.state = req.body.company_data.state
          ? JSON.stringify(req.body.company_data.state)
          : null;
        req.body.company_data.country = req.body.company_data.country
          ? JSON.stringify(req.body.company_data.country)
          : null;
        connection.query(
          `INSERT INTO ${SQL.tables.company} SET ?`,
          req.body.company_data,
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
                message: "Company added successfully",
              });
            }
          }
        );
      }
    }
  );
};

exports.addBank = (req, res) => {
  connection.query(
    `INSERT INTO ${SQL.tables.bank} SET ?`,
    req.body,
    (error, data) => {
      if (error) {
        console.log(error);
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else {
        connection.query(
          `UPDATE ${SQL.tables.company} SET bank_id=CONCAT(${data.insertId},',',bank_id) WHERE id=${req.params.company_id}`,
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
      }
    }
  );
};

exports.getCompany = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;
  let branch = req.query.branch ? `WHERE id=${req.query.branch}` : "";

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS *,'$100' AS totalSales,'$100' AS totalPurchase FROM ${SQL.tables.company} ${branch} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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
        data[0].map((el) => {
          el.city = JSON.parse(el.city);
          el.state = JSON.parse(el.state);
          el.country = JSON.parse(el.country);
        });
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

exports.getOneCompany = (req, res) => {
  connection.query(
    `SELECT *,@bank_id:=bank_id AS bank_id FROM ${SQL.tables.company} WHERE id=${req.params.id};SELECT * FROM ${SQL.tables.bank} WHERE FIND_IN_SET(id,@bank_id)`,
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
        data[0].map((el) => {
          el.city = JSON.parse(el.city);
          el.state = JSON.parse(el.state);
          el.country = JSON.parse(el.country);
        });
        res.json({
          statusCode: 200,
          success: true,
          message: "Success",
          company_data: data[0][0],
          bank_data: data[1],
        });
      }
    }
  );
};

exports.updateCompany = (req, res) => {
  req.body.city = req.body.city ? JSON.stringify(req.body.city) : null;
  req.body.state = req.body.state ? JSON.stringify(req.body.state) : null;
  req.body.country = req.body.country ? JSON.stringify(req.body.country) : null;

  connection.query(
    `UPDATE ${SQL.tables.company} SET ? WHERE id=${req.params.id}`,
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
          message: "Updated successfully",
        });
      }
    }
  );
};

exports.updateBank = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.bank} SET ? WHERE id=${req.params.id}`,
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

exports.deleteCompany = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.bank} WHERE FIND_IN_SET(id,(SELECT bank_id FROM ${SQL.tables.company} WHERE id=${req.params.id}));DELETE FROM ${SQL.tables.company} WHERE id=${req.params.id})`,
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

exports.deleteBank = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.bank} WHERE id=${req.params.id}; UPDATE ${SQL.tables.company} SET bank_id = REGEXP_REPLACE(bank_id, '(,(\s)?)?${req.params.id}', '')`,
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

exports.companyLogo = (req, res) => {
  single_image_handler(req.files[Object.keys(req.files)[0]])
    .then((data) => {
      connection.query(
        `UPDATE ${SQL.tables.company} SET logo=? WHERE id=${req.params.id}`,
        data,
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
              imageUrl: data,
            });
          }
        }
      );
    })
    .catch((err) => {
      res.json({
        statusCode: err.code,
        success: false,
        message: err.msg,
      });
    });
};

exports.onlyLogoUpload = (req, res) => {
  single_image_handler(req.files[Object.keys(req.files)[0]])
    .then((data) => {
      res.json({
        statusCode: 200,
        success: true,
        imgUrl: data,
      });
    })
    .catch((err) => {
      res.json({
        statusCode: 500,
        success: false,
        message: "Error while uploading image, try after sometimes",
      });
    });
};
