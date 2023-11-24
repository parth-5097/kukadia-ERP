const { exportToCsv, exportToPdf } = require("../../handlers/export");
const ejs = require("ejs");

exports.makePdf = (req, res) => {
  ejs
    .renderFile(`views/datatables/dt_${req.params.table}.ejs`, {
      data: req.body.data,
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
            message: "Failed to export data at the moment try after sometime",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        statusCode: 500,
        success: false,
        message: "Failed to export data at the moment try after sometime",
      });
    });
};

exports.makeCSV = (req, res) => {
  exportToCsv(req.body.data)
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
        message: "Failed to export data at the moment try after sometime",
      });
    });
};
