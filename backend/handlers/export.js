const ObjectsToCsv = require("objects-to-csv");
const pdf = require("html-pdf");
const {
  randomFixedInteger,
} = require("../controllers/middleware/midd_control");

exports.exportToCsv = (data) => {
  return new Promise(async (resolve, reject) => {
    const name = randomFixedInteger(12);
    new ObjectsToCsv(data)
      .toDisk(`public/csv/${name}.csv`, {
        append: true,
      })
      .then((value) => {
        resolve(`csv/${name}.csv`);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

exports.exportToPdf = (html, name = randomFixedInteger(12)) => {
  return new Promise((resolve, reject) => {
    pdf
      .create(html, {
        height: "25in",
        width: "22in",
        header: {
          height: "20mm",
        },
        footer: {
          height: "20mm",
        },
      })
      .toFile(`public/pdf/${name}.pdf`, (error, filename) => {
        if (error) {
          return reject(error);
        } else {
          resolve(`pdf/${name}.pdf`);
        }
      });
  });
};
