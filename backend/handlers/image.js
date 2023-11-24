const {
  randomFixedInteger,
} = require("../controllers/middleware/midd_control");

exports.single_image_handler = (files) => {
  return new Promise((resolve, reject) => {
    if (files) {
      files.name = randomFixedInteger(12) + "_" + files.name;
      if (
        files.mimetype == "image/png" ||
        files.mimetype === "image/jpg" ||
        files.mimetype === "image/jpeg" ||
        files.mimetype === "application/octet-stream"
      ) {
        files.mv("public/images/" + files.name, (error) => {
          if (error) {
            return reject({
              code: 500,
              msg: "Can not upload image at the momemt try after sometimes",
            });
          } else {
            resolve(`/images/${files.name}`);
          }
        });
      } else {
        return reject({
          code: 403,
          msg: "Invalid file type",
        });
      }
    } else {
      return reject({
        code: 404,
        msg: "Atleast one image is required to upload",
      });
    }
  });
};

exports.single_file_upload_handler = (files) => {
  return new Promise((resolve, reject) => {
    if (files) {
      files.name = randomFixedInteger(12) + "_" + files.name;
      files.mv("public/file/" + files.name, (error) => {
        if (error) {
          return reject({
            code: 500,
            msg: "Can not upload file at the momemt try after sometimes",
          });
        } else {
          resolve(`/file/${files.name}`);
        }
      });
    } else {
      return reject({
        code: 404,
        msg: "Atleast one file is required to upload",
      });
    }
  });
};
