const bcrypt = require("bcrypt");

const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");
const { mail } = require("../../handlers/mail");
const { randomFixedInteger } = require("../middleware/midd_control");

/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-24 16:15:38
 * @modify date 2021-03-02 14:14:49
 * @desc [User added with existing user check]
 */

exports.addUser = (req, res) => {
  let password = Math.random().toString(36).substring(2, 10);
  req.body.password = bcrypt.hashSync(password, 10);
  connection.query(
    `SELECT id FROM ${SQL.tables.users} WHERE email="${req.body.email}";SELECT id FROM ${SQL.tables.branch} WHERE FIND_IN_SET(name,"${req.body.branch_access}")`,
    (error, data) => {
      if (error) {
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else if (data[0].length === 0) {
        connection.query(
          `INSERT INTO ${SQL.tables.users} SET ?`,
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
              let not = {
                account_id: req.user.id,
                msg: "User added",
              };
              connection.query(
                `INSERT INTO ${SQL.tables.notification} SET ?`,
                not,
                (error) => {
                  if (error) {
                    res.json({
                      statusCode: 500,
                      success: false,
                      message: "Something went wrong",
                    });
                  } else {
                    let mailDetails = {
                      from: process.env.MAIL_USER,
                      to: req.body.email,
                      subject: "New password for kukadia ERP",
                      html: `<!doctype html>
                            <html>
                              <head>
                                <meta name="viewport" content="width=device-width" />
                                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                                <title>Simple Transactional Email</title>
                                <style>
                                  /* -------------------------------------
                                      GLOBAL RESETS
                                  ------------------------------------- */
                                  img {
                                    border: none;
                                    -ms-interpolation-mode: bicubic;
                                    max-width: 100%; }
                                  body {
                                    background-color: #f6f6f6;
                                    font-family: sans-serif;
                                    -webkit-font-smoothing: antialiased;
                                    font-size: 14px;
                                    line-height: 1.4;
                                    margin: 0;
                                    padding: 0; 
                                    -ms-text-size-adjust: 100%;
                                    -webkit-text-size-adjust: 100%; }
                                  table {
                                    border-collapse: separate;
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    width: 100%; }
                                    table td {
                                      font-family: sans-serif;
                                      font-size: 14px;
                                      vertical-align: top; }
                                  /* -------------------------------------
                                      BODY & CONTAINER
                                  ------------------------------------- */
                                  .body {
                                    background-color: #f6f6f6;
                                    width: 100%; }
                                  /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                                  .container {
                                    display: block;
                                    Margin: 0 auto !important;
                                    /* makes it centered */
                                    max-width: 580px;
                                    padding: 10px;
                                    width: 580px; }
                                  /* This should also be a block element, so that it will fill 100% of the .container */
                                  .content {
                                    box-sizing: border-box;
                                    display: block;
                                    Margin: 0 auto;
                                    max-width: 580px;
                                    padding: 10px; }
                                  /* -------------------------------------
                                      HEADER, FOOTER, MAIN
                                  ------------------------------------- */
                                  .main {
                                    background: #fff;
                                    border-radius: 3px;
                                    width: 100%; }
                                  .wrapper {
                                    box-sizing: border-box;
                                    padding: 20px; }
                                  .footer {
                                    clear: both;
                                    padding-top: 10px;
                                    text-align: center;
                                    width: 100%; }
                                    .footer td,
                                    .footer p,
                                    .footer span,
                                    .footer a {
                                      color: #999999;
                                      font-size: 12px;
                                      text-align: center; }
                                  /* -------------------------------------
                                      TYPOGRAPHY
                                  ------------------------------------- */
                                  h1,
                                  h2,
                                  h3,
                                  h4 {
                                    color: #000000;
                                    font-family: sans-serif;
                                    font-weight: 400;
                                    line-height: 1.4;
                                    margin: 0;
                                    Margin-bottom: 30px; }
                                  h1 {
                                    font-size: 35px;
                                    font-weight: 300;
                                    text-align: center;
                                    text-transform: capitalize; }
                                  p,
                                  ul,
                                  ol {
                                    font-family: sans-serif;
                                    font-size: 14px;
                                    font-weight: normal;
                                    margin: 0;
                                    Margin-bottom: 15px; }
                                    p li,
                                    ul li,
                                    ol li {
                                      list-style-position: inside;
                                      margin-left: 5px; }
                                  a {
                                    color: #3498db;
                                    text-decoration: underline; }
                                  /* -------------------------------------
                                      BUTTONS
                                  ------------------------------------- */
                                  .btn {
                                    box-sizing: border-box;
                                    width: 100%; }
                                    .btn > tbody > tr > td {
                                      padding-bottom: 15px; }
                                    .btn table {
                                      width: auto; }
                                    .btn table td {
                                      background-color: #ffffff;
                                      border-radius: 5px;
                                      text-align: center; }
                                    .btn a {
                                      background-color: #ffffff;
                                      border: solid 1px #3498db;
                                      border-radius: 5px;
                                      box-sizing: border-box;
                                      color: #3498db;
                                      cursor: pointer;
                                      display: inline-block;
                                      font-size: 14px;
                                      font-weight: bold;
                                      margin: 0;
                                      padding: 12px 25px;
                                      text-decoration: none;
                                      text-transform: capitalize; }
                                  .btn-primary table td {
                                    background-color: #3498db; }
                                  .btn-primary a {
                                    background-color: #3498db;
                                    border-color: #3498db;
                                    color: #ffffff; }
                                  /* -------------------------------------
                                      OTHER STYLES THAT MIGHT BE USEFUL
                                  ------------------------------------- */
                                  .last {
                                    margin-bottom: 0; }
                                  .first {
                                    margin-top: 0; }
                                  .align-center {
                                    text-align: center; }
                                  .align-right {
                                    text-align: right; }
                                  .align-left {
                                    text-align: left; }
                                  .clear {
                                    clear: both; }
                                  .mt0 {
                                    margin-top: 0; }
                                  .mb0 {
                                    margin-bottom: 0; }
                                  .preheader {
                                    color: transparent;
                                    display: none;
                                    height: 0;
                                    max-height: 0;
                                    max-width: 0;
                                    opacity: 0;
                                    overflow: hidden;
                                    mso-hide: all;
                                    visibility: hidden;
                                    width: 0; }
                                  .powered-by a {
                                    text-decoration: none; }
                                  hr {
                                    border: 0;
                                    border-bottom: 1px solid #f6f6f6;
                                    Margin: 20px 0; }
                                  /* -------------------------------------
                                      RESPONSIVE AND MOBILE FRIENDLY STYLES
                                  ------------------------------------- */
                                  @media only screen and (max-width: 620px) {
                                    table[class=body] h1 {
                                      font-size: 28px !important;
                                      margin-bottom: 10px !important; }
                                    table[class=body] p,
                                    table[class=body] ul,
                                    table[class=body] ol,
                                    table[class=body] td,
                                    table[class=body] span,
                                    table[class=body] a {
                                      font-size: 16px !important; }
                                    table[class=body] .wrapper,
                                    table[class=body] .article {
                                      padding: 10px !important; }
                                    table[class=body] .content {
                                      padding: 0 !important; }
                                    table[class=body] .container {
                                      padding: 0 !important;
                                      width: 100% !important; }
                                    table[class=body] .main {
                                      border-left-width: 0 !important;
                                      border-radius: 0 !important;
                                      border-right-width: 0 !important; }
                                    table[class=body] .btn table {
                                      width: 100% !important; }
                                    table[class=body] .btn a {
                                      width: 100% !important; }
                                    table[class=body] .img-responsive {
                                      height: auto !important;
                                      max-width: 100% !important;
                                      width: auto !important; }}
                                  @media all {
                                    .ExternalClass {
                                      width: 100%; }
                                    .ExternalClass,
                                    .ExternalClass p,
                                    .ExternalClass span,
                                    .ExternalClass font,
                                    .ExternalClass td,
                                    .ExternalClass div {
                                      line-height: 100%; }
                                    .apple-link a {
                                      color: inherit !important;
                                      font-family: inherit !important;
                                      font-size: inherit !important;
                                      font-weight: inherit !important;
                                      line-height: inherit !important;
                                      text-decoration: none !important; } 
                                    .btn-primary table td:hover {
                                      background-color: #34495e !important; }
                                    .btn-primary a:hover {
                                      background-color: #34495e !important;
                                      border-color: #34495e !important; } }
                                </style>
                              </head>
                              <body class="">
                                <table border="0" cellpadding="0" cellspacing="0" class="body">
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td class="container">
                                      <div class="content">
                                        <table class="main">
                            
                                          <!-- START MAIN CONTENT AREA -->
                                          <tr>
                                            <td class="wrapper">
                                              <table border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                  <td>
                                                    <h1>Confirm your email</h1>
                                                    <h2>You are just one step away</h2>
                                                    <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                                      <tbody>
                                                        <tr>
                                                          <td align="left">
                                                            <table border="0" cellpadding="0" cellspacing="0">
                                                              <tbody>
                                                                <tr>
                                                                  <td><h2>Password: </h2> <br /> <h1>${password}</h1></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <p>Please ignore this email and your password will remain unchanged, if you did not make such request.\n\n</p><p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                                  
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                            
                                        <!-- END MAIN CONTENT AREA -->
                                        </table>
                            
                                        <!-- START FOOTER -->
                                        <div class="footer">
                                          <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                              <td class="content-block">
                                                <span class="apple-link">Coloured.com.ng | Feminism | Culture | Law | Feminists Rising</span>
                                                <br> Don't like these emails? <a href="#">Unsubscribe</a>.
                                              </td>
                                            </tr>
                                            <tr>
                                              <td class="content-block powered-by">
                                                Powered by <a href="https://fb.me/jalasem">Jalasem</a>.
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                        <!-- END FOOTER -->
                                        
                                      <!-- END CENTERED WHITE CONTAINER -->
                                      </div>
                                    </td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </table>
                              </body>
                            </html>`,
                    };
                    mail(mailDetails)
                      .then((data) => {
                        req.app
                          .get("socketService")
                          .emitAny(not.account_id, "NOTIFICATION", not.msg);
                        res.json({
                          statusCode: 200,
                          success: true,
                          message:
                            "Record added successfully, User will get the password via email",
                        });
                      })
                      .catch((err) => {
                        res.json({
                          statusCode: 500,
                          success: true,
                          message:
                            "Failed to send email at this moment try after sometimes",
                        });
                      });
                  }
                }
              );
            }
          }
        );
      } else {
        res.json({
          statusCode: 200,
          success: false,
          message: "This user exists in records",
        });
      }
    }
  );
};

exports.editUser = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.users} SET ? WHERE id=${req.params.id}`,
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
          message: "Entry updated",
        });
        req.app.get("socketService").onlyOnceEmiter("RECORD_EVENT", {
          message: "User Edited",
        });
      }
    }
  );
};

exports.getUser = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;
  let branch = req.query.branch
    ? `WHERE FIND_IN_SET(${req.query.branch},t1.branch_access)`
    : "";

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS t1.*,IF(!t1.branch_access, '',(SELECT GROUP_CONCAT(t2.location) FROM ${SQL.tables.branch} t2 WHERE FIND_IN_SET(t2.id,t1.branch_access))) AS location FROM ${SQL.tables.users} t1 ${branch} LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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

exports.deleteUser = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.users} WHERE id=${req.params.id}`,
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
          message: "Entry Deleted",
        });
      }
    }
  );
};

exports.getCurrentUser = (req, res) => {
  connection.query(
    `SELECT id,avatar,login_status,first_name,last_name,email,acc_type,mobile_no,"support@kukadia.co" AS company_email FROM ${SQL.tables.users} WHERE id=${req.user.id}`,
    (error, data) => {
      if (error) {
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else if (data.length === 0) {
        res.json({
          statusCode: 404,
          success: false,
          message: "No user found",
        });
      } else {
        res.json({
          statusCode: 200,
          success: true,
          message: "Success",
          data: data[0],
        });
      }
    }
  );
};

exports.editProfile = (req, res) => {
  delete req.body.company_email;
  if (req.body) {
    connection.query(
      `UPDATE ${SQL.tables.users} SET ? WHERE id=${req.user.id}`,
      req.body,
      (error) => {
        if (error.errno == 1062) {
          res.json({
            statusCode: 403,
            success: false,
            message: `${req.body.email} already exists`,
          });
        } else if (error) {
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
            message: "Profile has been updated successfully",
          });
        }
      }
    );
  } else {
    res.json({
      statusCode: 200,
      success: false,
      message: "Atleast one field is require",
    });
  }
};

exports.editImage = (req, res) => {
  if (req.files) {
    req.files.image.name = randomFixedInteger(12) + "_" + req.files.image.name;
    if (
      req.files.image.mimetype == "image/png" ||
      req.files.image.mimetype === "image/jpg" ||
      req.files.image.mimetype === "image/jpeg" ||
      req.files.image.mimetype === "application/octet-stream"
    ) {
      req.files.image.mv("public/images/" + req.files.image.name, (error) => {
        if (error) {
          res.json({
            statusCode: 500,
            success: false,
            message: "Something went wrong",
          });
        } else {
          connection.query(
            `UPDATE ${SQL.tables.users} SET ? WHERE id=${req.user.id}`,
            { avatar: `/images/${req.files.image.name}` },
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
                  imageUrl: `/images/${req.files.image.name}`,
                });
              }
            }
          );
        }
      });
    } else {
      res.json({
        statusCode: 200,
        success: false,
        message: "Check your type",
      });
    }
  } else {
    res.json({
      statusCode: 200,
      success: false,
      message: "Select atleast one image to upload",
    });
  }
};

/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-24 16:18:08
 * @modify date 2021-02-24 16:18:08
 * @desc [Gave branch access on different user]
 */

exports.giveBranchAccess = (req, res) => {
  connection.query(
    `SELECT id FROM ${SQL.tables.users} WHERE id=${req.params.id}`,
    (error, data) => {
      if (error) {
        res.json({
          statusCode: 500,
          success: false,
          message: "Something went wrong",
        });
      } else if (data.length === 0) {
        res.json({
          statusCode: 404,
          success: false,
          message: "User does not exists",
        });
      } else {
        connection.query(
          `UPDATE ${SQL.tables.users} SET ?`,
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
                message: "Branch access given successfully",
              });
            }
          }
        );
      }
    }
  );
};

exports.checkDuplicateUser = (req, res) => {
  connection.query(
    `SELECT email FROM ${SQL.tables.users} WHERE email="${req.body.email}"`,
    (error, data) => {
      if (error || data.length == 0) {
        res.json({
          statusCode: 200,
          success: true,
        });
      } else {
        res.json({
          statusCode: 200,
          success: true,
          message: "Email exists",
        });
      }
    }
  );
};

exports.changePassword = (req, res) => {
  connection.query(
    `SELECT id,password FROM ${SQL.tables.users} WHERE id IN (SELECT user_id FROM ${SQL.tables.transactional.token} WHERE FIND_IN_SET("${req.headers.authorization}",desktop) OR mac="${req.headers.authorization}" OR mobile="${req.headers.authorization}")`,
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
          message:
            "Your login session is expire or you havn't register with our services yet",
        });
      } else {
        if (
          bcrypt.compareSync(req.body.old_password, data[0].password) == true
        ) {
          let password = bcrypt.hashSync(req.body.new_password, 10);
          connection.query(
            `UPDATE ${SQL.tables.users} SET password=? WHERE id=${data[0].id}`,
            password,
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
                  message: "Password set successfully",
                });
              }
            }
          );
        } else {
          res.json({
            statusCode: 403,
            success: false,
            message:
              "Your old password does not match with your current password",
          });
        }
      }
    }
  );
};
