const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.MAIL_SERVICE,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.mail = (data) => {
  return new Promise((resolve, reject) => {
    transporter
      .sendMail(data)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};
