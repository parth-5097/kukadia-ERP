const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");
const { single_file_upload_handler } = require("../../handlers/image");

exports.addShip = (req, res) => {
  connection.query(
    `INSERT INTO ${SQL.tables.ship} SET ?`,
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
          message: "Ship inserted successfully",
        });
      }
    }
  );
};

exports.getShip = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS t1.*,t2.name,t2.phone_no,t2.billing_address FROM ${SQL.tables.ship} t1 INNER JOIN ${SQL.tables.customer} t2 ON t1.customer_id=t2.id LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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
          message: "Success",
          totalRecords: data[1][0].totalRecords,
          data: data[0],
        });
      }
    }
  );
};

exports.editShip = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.ship} SET ? WHERE id=${req.params.id}`,
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
          message: "Updated terms successfully",
        });
      }
    }
  );
};

exports.deleteShip = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.ship} WHERE id=${req.params.id}`,
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
          message: "Updated terms successfully",
        });
      }
    }
  );
};

exports.addTrack = (req, res) => {
  connection.query(
    `INSERT INTO ${SQL.tables.track} SET ?`,
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
          message: "Tracking Inserted Successfully",
        });
      }
    }
  );
};

exports.getTrack = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS t1.*,t2.name,t2.billing_address,t2.phone_no,t3.shipping_address FROM ${SQL.tables.track} t1 INNER JOIN ${SQL.tables.customer} t2 ON t1.customer_id=t2.id INNER JOIN ${SQL.tables.ship} t3 ON t1.ship_id=t3.id LIMIT ? OFFSET ?;SELECT FOUND_ROWS() AS totalRecords`,
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
          message: "Success",
          totalRecords: data[1][0].totalRecords,
          data: data[0],
        });
      }
    }
  );
};

exports.editTrack = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.track} SET ? WHERE id=${req.params.id}`,
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
          message: "Updated terms successfully",
        });
      }
    }
  );
};

exports.deleteTrack = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.track} WHERE id=${req.params.id}`,
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
          message: "Updated terms successfully",
        });
      }
    }
  );
};

exports.searchTrackUsers = (req, res) => {
  connection.query(
    `SELECT id AS user_id,avatar,email,mobile_no,CONCAT(first_name,' ',last_name) AS name,isOnline,lastOnline FROM ${SQL.tables.users} WHERE LOCATE('${req.params.search}',first_name) OR LOCATE('${req.params.search}',last_name) OR LOCATE('${req.params.search}',email)`,
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
          data: data.filter((el) => el.id != req.user.id),
        });
      }
    }
  );
};

exports.getProfileOfSelectedUser = (req, res) => {
  connection.query(
    `SELECT id,avatar,first_name,last_name,email, FROM ${SQL.tables.users} WHERE id=${req.params.id}`,
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

exports.uploadFilesForChat = (req, res) => {
  if (req.files) {
    single_file_upload_handler(req.files[Object.keys(req.files)[0]]).then(
      (data) => {
        req.body.atch = data;
        connection.query(
          `INSERT INTO ${SQL.tables.chat} SET ?`,
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
              connection.query(
                `SELECT * FROM ${SQL.tables.chat} WHERE from_id=${req.body.from_id} AND to_id=${req.body.to_id}; SELECT isOnline,lastOnline FROM ${SQL.tables.users} WHERE id=${req.body.to_id}`,
                (error, data) => {
                  if (error) {
                    console.log(error);
                    res.json({
                      statusCode: 500,
                      success: false,
                      message: "Something went wrong",
                    });
                  } else {
                    console.log({
                      ...data[0][0],
                      ...data[1][0],
                    });
                    data[1][0].isOnline == 1
                      ? req.app
                          .get("socketService")
                          .emitInRoom(req.body.to_id, "CHAT_RECIEVE", {
                            ...data[0][0],
                            ...data[1][0],
                          })
                      : ``;
                    res.json({
                      statusCode: 200,
                      success: true,
                      message:
                        "Uploaded success fully, and send it to the user",
                    });
                  }
                }
              );
            }
          }
        );
      }
    );
  } else {
    res.json({
      statusCode: 404,
      success: false,
      message: "Atleast one file is require to upload",
    });
  }
};

exports.getUserAlreadyChat = (req, res) => {
  connection.query(
    `SELECT t1.id,t1.to_id AS user_id,t2.avatar,CONCAT(t2.first_name,' ',t2.last_name) AS name,t1.status,t1.msg,t2.lastOnline,t1.timestamp 
    FROM ${SQL.tables.chat} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.to_id=t2.id WHERE t1.from_id=${req.user.id} AND t1.timestamp=(SELECT MAX(timestamp) FROM ${SQL.tables.chat} t3 WHERE t1.to_id=t3.to_id) UNION
    SELECT t1.id,t1.from_id AS user_id,t2.avatar,CONCAT(t2.first_name,' ',t2.last_name) AS name,t1.status,t1.msg,t2.lastOnline,t1.timestamp 
    FROM ${SQL.tables.chat} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.from_id=t2.id 
    WHERE t1.to_id=${req.user.id} AND 
    t1.timestamp=(SELECT MAX(timestamp) FROM ${SQL.tables.chat} t3 WHERE t1.from_id=t3.from_id) AND 
    t1.from_id NOT IN (SELECT t1.to_id FROM ${SQL.tables.chat} t1 INNER JOIN ${SQL.tables.chat} t2 ON t1.to_id=t2.id WHERE t1.from_id=${req.user.id} AND t1.timestamp=(SELECT MAX(timestamp) FROM ${SQL.tables.chat} t3 WHERE t1.to_id=t3.to_id))`,
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

exports.getChatForPerticularUser = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.page.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.page.limit;

  connection.query(
    `SELECT SQL_CALC_FOUND_ROWS id,from_id,to_id,msg,atch,status,DATE_FORMAT(timestamp, '%Y-%m-%d') AS date,TIME(timestamp) AS time FROM ${SQL.tables.chat} WHERE (from_id=${req.user.id} OR to_id=${req.user.id}) AND (from_id=${req.params.id} OR to_id=${req.params.id}) ORDER BY timestamp ASC LIMIT ? OFFSET ?;
     SELECT FOUND_ROWS() AS totalRecords;
     SELECT id,CONCAT(first_name,' ',last_name) AS name,email,mobile_no FROM ${SQL.tables.users} WHERE id=${req.params.id}`,
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
        connection.query(
          `UPDATE ${
            SQL.tables.chat
          } SET status=2 WHERE FIND_IN_SET(id,"${Array.from(data[0])
            .map((el) => {
              return el.id;
            })
            .join(",")}")`,
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
                message: "Success",
                totalRecords: data[1][0].totalRecords,
                userData: data[2][0],
                data: data[0].reduce((arr, val) => {
                  const item = arr.find((item) => item.date == val.date);
                  !item
                    ? arr.push({
                        date: val.date,
                        data: [val],
                      })
                    : item.data.push(val);
                  return arr;
                }, []),
              });
            }
          }
        );
      }
    }
  );
};
