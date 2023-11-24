/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-25 16:24:48
 * @modify date 2021-03-03 18:52:49
 * @desc [Make socket solution to use in every route with req.app.get("socketService").onlyOnceEmiter(eventName, eventBody) for using on api call or for main index file or in app express route simply remove 'req.']
 */
const socketIo = require("socket.io");
const express = require("express");
const request = require("request");
const { of } = require("rxjs");
const cron = require("node-cron");
const connection = require("../database/connect");
const { SQL } = require("../config");

let priceAndMetal = {
  price: [
    {
      productTitle: "HKD",
      old_price: "7.76224",
      price: "7.76223",
      change: "-0.00001",
      changePercent: "-0.00013",
    },
    {
      productTitle: "CAD",
      old_price: "1.20745",
      price: "1.20734",
      change: "-0.00011",
      changePercent: "-0.00911",
    },
    {
      productTitle: "EURO",
      old_price: "0.81690",
      price: "0.81690",
      change: "0.00000",
      changePercent: "0.00000",
    },
    {
      productTitle: "GBP",
      old_price: "0.70564",
      price: "0.70565",
      change: "0.00001",
      changePercent: "0.00141",
    },
    {
      productTitle: "INR",
      old_price: "72.69600",
      price: "72.69700",
      change: "0.00100",
      changePercent: "0.00137",
    },
    {
      productTitle: "CNY",
      old_price: "6.38880",
      price: "6.38880",
      change: "0.00000",
      changePercent: "0.00000",
    },
  ],
  metal: [
    {
      productTitle: "Gold",
      old_price: "1907.59998",
      price: "1907.19995",
      change: "-0.40002",
      changePercent: "-0.02097",
    },
    {
      productTitle: "Platinum",
      old_price: "1202.00000",
      price: "1201.69995",
      change: "-0.30005",
      changePercent: "-0.02496",
    },
    {
      productTitle: "Silver",
      old_price: "28.15500",
      price: "28.15500",
      change: "0.00000",
      changePercent: "0.00000",
    },
  ],
};

class SocketService {
  constructor(server) {
    this.io = socketIo(server);

    this.io.use((socket, next) => {
      console.log(socket.request._query.user_id, socket.id);
      connection.query(
        `UPDATE ${SQL.tables.users} SET isOnline=1 WHERE id=${socket.request._query.user_id}`,
        (error) => {
          if (error) {
            console.log(error);
            socket.emit("CONNECTION_ERROR", {
              error: error,
              message: "Internal server error",
            });
            next();
          } else {
            socket.join(socket.request._query.user_id);
            this.io.emit("LATEST_CONNECTED_USER", {
              user_id: socket.request._query.user_id,
            });
            next();
          }
        }
      );
    });

    this.io.on("connection", (socket) => {
      const t = new Date(new Date().toUTCString());

      express.static.activeUser = this.io.engine.clientsCount;
      socket.emit("ACTIVE_USER", this.io.engine.clientsCount);

      of(this.io.engine.clientsCount).subscribe(
        (value) => {
          socket.broadcast.emit("ACTIVE_USER", value);
        },
        (error) => {
          socket.emit("SERVER_ERROR", {
            error: error,
            message: "Something went wrong",
          });
        }
      );

      socket.on("CURRENT_USER", (id) => {
        socket.join(id);
      });

      socket.on("LOAD_DASHBOARD", (data) => {
        console.log(data);
        socket.emit("COUNTRY_TIME", [
          {
            name: "India",
            time: new Date(t.getTime() - -Math.floor(5.5 * 60 * 60 * 1000))
              .toISOString()
              .split("T")[1]
              .split(".")[0],
            flag: "/flag/india.png",
          },
          {
            name: "Los Angeles",
            time: new Date(t.getTime() + -Math.floor(7 * 60 * 60 * 1000))
              .toISOString()
              .split("T")[1]
              .split(".")[0],
            flag: "/flag/usa.png",
          },
          {
            name: "Newyork",
            time: new Date(t.getTime() + -Math.floor(4 * 60 * 60 * 1000))
              .toISOString()
              .split("T")[1]
              .split(".")[0],
            flag: "/flag/usa.png",
          },
          {
            name: "Hongkong",
            time: new Date(t.getTime() - -Math.floor(8 * 60 * 60 * 1000))
              .toISOString()
              .split("T")[1]
              .split(".")[0],
            flag: "/flag/hongkong.png",
          },
          {
            name: "Belgium",
            time: new Date(t.getTime() - -Math.floor(2 * 60 * 60 * 1000))
              .toISOString()
              .split("T")[1]
              .split(".")[0],
            flag: "/flag/belgium.png",
          },
          {
            name: "Moskow",
            time: new Date(t.getTime() - -Math.floor(3 * 60 * 60 * 1000))
              .toISOString()
              .split("T")[1]
              .split(".")[0],
            flag: "/flag/russia.png",
          },
        ]);

        socket.emit("CHART", {
          cashOnHand: [
            {
              data: [
                44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43, 41, 67, 22, 43,
              ],
            },
            {
              data: [
                13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 22, 43, 41, 67, 22, 43,
              ],
            },
          ],
          totalSale: [
            {
              data: [
                13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 22, 43, 41, 67, 22, 43,
              ],
            },
          ],
          totalPurchase: [
            {
              data: [
                13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 22, 43, 41, 67, 22, 43,
              ],
            },
            {
              data: [
                44, 55, 41, 67, 22, 43, 41, 67, 22, 43, 13, 23, 20, 8, 13, 27,
              ],
            },
          ],
          averageSale: [30, 70],
          recent: [
            {
              data: [
                13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 22, 43, 41, 67, 22, 43,
              ],
            },
            {
              data: [
                44, 55, 41, 67, 22, 43, 41, 67, 22, 43, 13, 23, 20, 8, 13, 27,
              ],
            },
          ],
          chartInventory: [
            {
              data: [
                13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 10, 13, 25, 9, 17, 17,
              ],
            },
            {
              data: [
                10, 13, 25, 9, 17, 17, 44, 15, 81, 67, 22, 43, 41, 67, 22, 43,
              ],
            },
            {
              data: [
                13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 22, 43, 41, 67, 22, 43,
              ],
            },
            {
              data: [
                67, 22, 43, 41, 67, 22, 43, 55, 41, 67, 10, 13, 25, 9, 17, 17,
              ],
            },
          ],
        });

        socket.emit("PRICE_METAL", priceAndMetal);

        cron.schedule("* * */24 * * *", () => {
          getPriceAndMetal(function () {
            socket.emit("PRICE_METAL", priceAndMetal);
          });
        });

        cron.schedule("*/1 * * * * *", () => {
          const t = new Date(new Date().toUTCString());

          socket.emit("COUNTRY_TIME", [
            {
              name: "India",
              time: new Date(t.getTime() - -Math.floor(5.5 * 60 * 60 * 1000))
                .toISOString()
                .split("T")[1]
                .split(".")[0],
              flag: "/flag/india.png",
            },
            {
              name: "Los Angeles",
              time: new Date(t.getTime() + -Math.floor(7 * 60 * 60 * 1000))
                .toISOString()
                .split("T")[1]
                .split(".")[0],
              flag: "/flag/usa.png",
            },
            {
              name: "Newyork",
              time: new Date(t.getTime() + -Math.floor(4 * 60 * 60 * 1000))
                .toISOString()
                .split("T")[1]
                .split(".")[0],
              flag: "/flag/usa.png",
            },
            {
              name: "Hongkong",
              time: new Date(t.getTime() - -Math.floor(8 * 60 * 60 * 1000))
                .toISOString()
                .split("T")[1]
                .split(".")[0],
              flag: "/flag/hongkong.png",
            },
            {
              name: "Belgium",
              time: new Date(t.getTime() - -Math.floor(2 * 60 * 60 * 1000))
                .toISOString()
                .split("T")[1]
                .split(".")[0],
              flag: "/flag/belgium.png",
            },
            {
              name: "Moskow",
              time: new Date(t.getTime() - -Math.floor(3 * 60 * 60 * 1000))
                .toISOString()
                .split("T")[1]
                .split(".")[0],
              flag: "/flag/russia.png",
            },
          ]);
        });
      });

      socket.on("CHAT_SEND", (data) => {
        connection.query(
          `INSERT INTO ${SQL.tables.chat} SET ?;
          SELECT id,from_id,to_id,msg,atch,status,DATE_FORMAT(timestamp, '%Y-%m-%d') AS date,TIME(timestamp) AS time FROM ${SQL.tables.chat} WHERE id=LAST_INSERT_ID()`,
          data,
          (error, insert) => {
            if (error) {
              socket.emit("SERVER_ERROR", {
                error: error,
                message: "Failed to send this message",
              });
            } else {
              insert[1][0].isOnline =
                this.io.sockets.adapter.rooms.get(`${data.to_id}`) == undefined
                  ? 0
                  : 1;
              if (this.io.sockets.adapter.rooms.get(`${data.to_id}`)) {
                connection.query(
                  `UPDATE ${SQL.tables.chat} SET status=1 WHERE id=${insert[0].insertId}`,
                  (error) => {
                    if (error) {
                      socket.emit("SERVER_ERROR", {
                        error: error,
                        message: "Something went wrong",
                      });
                    } else {
                      insert[1][0].status = 1;
                      this.io
                        .to(`${data.to_id}`)
                        .emit("CHAT_RECIEVE", { data: insert[1][0] });
                      this.io
                        .to(`${data.from_id}`)
                        .emit("CHAT_RECIEVE", { data: insert[1][0] });
                    }
                  }
                );
              } else {
                this.io
                  .to(`${data.from_id}`)
                  .emit("CHAT_PENDING", { data: insert[1][0] });
              }
            }
          }
        );
      });

      socket.on("disconnect", () => {
        socket.leave(`${socket.request._query.user_id}`);
        express.static.activeUser = this.io.engine.clientsCount;
        of(this.io.engine.clientsCount).subscribe(
          (value) => {
            socket.broadcast.emit("ACTIVE_USER", value);
          },
          (error) => {
            socket.emit("SERVER_ERROR", {
              error: error,
              message: "Something went wrong",
            });
          }
        );
        if (
          this.io.sockets.adapter.rooms.get(
            `${socket.request._query.user_id}`
          ) == undefined
        ) {
          connection.query(
            `UPDATE ${
              SQL.tables.users
            } SET isOnline=0,lastOnline="${new Date().toISOString()}" WHERE id=${
              socket.request._query.user_id
            }`,
            (error) => {
              if (error) {
                console.log(error);
                socket.emit("SERVER_ERROR", {
                  error: error,
                  message: "Internal server error",
                });
              } else {
                this.io.emit("LATEST_DISCONNECTED_USER", {
                  user_id: socket.request._query.user_id,
                });
              }
            }
          );
        }
      });
    });
  }

  onlyOnceEmiter(event, body) {
    if (body) {
      this.io.once("connection", (socket) => {
        socket.emit(event, body);
      });
    }
  }

  emitAny(id, event, body) {
    if (body) {
      this.io.to(parseInt(id)).emit(event, body);
    }
  }

  emitInRoom(id, event, body) {
    if (body) {
      this.io.to(`${id}`).emit(event, body);
    }
  }

  emitWithSocketId(id, event, body) {
    if (body) {
      this.io.to(id).emit(event, body);
    }
  }

  broadcastAll(event, body) {
    if (body) {
      this.io.sockets.emit(event, body);
    }
  }
}

async function getPriceAndMetal(_callback) {
  await Promise.all([
    new Promise((resolve, reject) => {
      request(
        "https://query1.finance.yahoo.com/v8/finance/chart/HKD=X",
        async (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let HKDYahoo = await JSON.parse(body)
              .chart.result[0].indicators.quote[0].high.reverse()
              .filter((el) => el != null);
            resolve({
              productTitle: "HKD",
              old_price: HKDYahoo[1].toFixed(5),
              price: HKDYahoo[0].toFixed(5),
              change: (HKDYahoo[0] + -HKDYahoo[1]).toFixed(5),
              changePercent: (
                ((HKDYahoo[0] + -HKDYahoo[1]) / HKDYahoo[1]) *
                100
              ).toFixed(5),
            });
          } else {
            reject(new Error(error));
          }
        }
      );
    }),
    new Promise((resolve, reject) => {
      request(
        "https://query1.finance.yahoo.com/v8/finance/chart/CAD=X",
        async (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let CADYahoo = await JSON.parse(body)
              .chart.result[0].indicators.quote[0].high.reverse()
              .filter((el) => el != null);
            resolve({
              productTitle: "CAD",
              old_price: CADYahoo[1].toFixed(5),
              price: CADYahoo[0].toFixed(5),
              change: (CADYahoo[0] + -CADYahoo[1]).toFixed(5),
              changePercent: (
                ((CADYahoo[0] + -CADYahoo[1]) / CADYahoo[1]) *
                100
              ).toFixed(5),
            });
          } else {
            reject(new Error(error));
          }
        }
      );
    }),
    new Promise((resolve, reject) => {
      request(
        "https://query1.finance.yahoo.com/v8/finance/chart/EUR=X",
        async (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let EUROYahoo = await JSON.parse(body)
              .chart.result[0].indicators.quote[0].high.reverse()
              .filter((el) => el != null);
            resolve({
              productTitle: "EURO",
              old_price: EUROYahoo[1].toFixed(5),
              price: EUROYahoo[0].toFixed(5),
              change: (EUROYahoo[0] + -EUROYahoo[1]).toFixed(5),
              changePercent: (
                ((EUROYahoo[0] + -EUROYahoo[1]) / EUROYahoo[1]) *
                100
              ).toFixed(5),
            });
          } else {
            reject(new Error(error));
          }
        }
      );
    }),
    new Promise((resolve, reject) => {
      request(
        "https://query1.finance.yahoo.com/v8/finance/chart/GBP=X",
        async (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let GBPYahoo = await JSON.parse(body)
              .chart.result[0].indicators.quote[0].high.reverse()
              .filter((el) => el != null);
            resolve({
              productTitle: "GBP",
              old_price: GBPYahoo[1].toFixed(5),
              price: GBPYahoo[0].toFixed(5),
              change: (GBPYahoo[0] + -GBPYahoo[1]).toFixed(5),
              changePercent: (
                ((GBPYahoo[0] + -GBPYahoo[1]) / GBPYahoo[1]) *
                100
              ).toFixed(5),
            });
          } else {
            reject(new Error(error));
          }
        }
      );
    }),
    new Promise((resolve, reject) => {
      request(
        "https://query1.finance.yahoo.com/v8/finance/chart/INR=X",
        async (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let INRYahoo = await JSON.parse(body)
              .chart.result[0].indicators.quote[0].high.reverse()
              .filter((el) => el != null);
            resolve({
              productTitle: "INR",
              old_price: INRYahoo[1].toFixed(5),
              price: INRYahoo[0].toFixed(5),
              change: (INRYahoo[0] + -INRYahoo[1]).toFixed(5),
              changePercent: (
                ((INRYahoo[0] + -INRYahoo[1]) / INRYahoo[1]) *
                100
              ).toFixed(5),
            });
          } else {
            reject(new Error(error));
          }
        }
      );
    }),
    new Promise((resolve, reject) => {
      request(
        "https://query1.finance.yahoo.com/v8/finance/chart/CNY=X",
        async (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let CNYYahoo = await JSON.parse(body)
              .chart.result[0].indicators.quote[0].high.reverse()
              .filter((el) => el != null);
            resolve({
              productTitle: "CNY",
              old_price: CNYYahoo[1].toFixed(5),
              price: CNYYahoo[0].toFixed(5),
              change: (CNYYahoo[0] + -CNYYahoo[1]).toFixed(5),
              changePercent: (
                ((CNYYahoo[0] + -CNYYahoo[1]) / CNYYahoo[1]) *
                100
              ).toFixed(5),
            });
          } else {
            reject(new Error(error));
          }
        }
      );
    }),
  ])
    .then((data) => {
      priceAndMetal.price = data;
    })
    .catch((err) => {
      console.log(err);
    });
  await Promise.all([
    new Promise((resolve, reject) => {
      request(
        "https://query1.finance.yahoo.com/v8/finance/chart/GC=F",
        async (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let GCYahoo = await JSON.parse(body)
              .chart.result[0].indicators.quote[0].high.reverse()
              .filter((el) => el != null);
            resolve({
              productTitle: "Gold",
              old_price: GCYahoo[1].toFixed(5),
              price: GCYahoo[0].toFixed(5),
              change: (GCYahoo[0] + -GCYahoo[1]).toFixed(5),
              changePercent: (
                ((GCYahoo[0] + -GCYahoo[1]) / GCYahoo[1]) *
                100
              ).toFixed(5),
            });
          } else {
            reject(new Error(error));
          }
        }
      );
    }),
    new Promise((resolve, reject) => {
      request(
        "https://query1.finance.yahoo.com/v8/finance/chart/PL=F",
        async (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let PLYahoo = await JSON.parse(body)
              .chart.result[0].indicators.quote[0].high.reverse()
              .filter((el) => el != null);
            resolve({
              productTitle: "Platinum",
              old_price: PLYahoo[1].toFixed(5),
              price: PLYahoo[0].toFixed(5),
              change: (PLYahoo[0] + -PLYahoo[1]).toFixed(5),
              changePercent: (
                ((PLYahoo[0] + -PLYahoo[1]) / PLYahoo[1]) *
                100
              ).toFixed(5),
            });
          } else {
            reject(new Error(error));
          }
        }
      );
    }),
    new Promise((resolve, reject) => {
      request(
        "https://query1.finance.yahoo.com/v8/finance/chart/SI=F",
        async (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let SIYahoo = await JSON.parse(body)
              .chart.result[0].indicators.quote[0].high.reverse()
              .filter((el) => el != null);
            resolve({
              productTitle: "Silver",
              old_price: SIYahoo[1].toFixed(5),
              price: SIYahoo[0].toFixed(5),
              change: (SIYahoo[0] + -SIYahoo[1]).toFixed(5),
              changePercent: (
                ((SIYahoo[0] + -SIYahoo[1]) / SIYahoo[1]) *
                100
              ).toFixed(5),
            });
          } else {
            reject(new Error(error));
          }
        }
      );
    }),
  ])
    .then((data) => {
      priceAndMetal.metal = data;
    })
    .catch((err) => {
      console.log(err);
    });
  _callback();
}

cron.schedule("* * */24 * * *", () => {
  getPriceAndMetal(function () {
    console.log("Scrapped");
  });
});

module.exports = SocketService;
