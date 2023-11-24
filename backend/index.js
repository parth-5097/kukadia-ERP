/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-25 16:27:38
 * @modify date 2021-02-25 16:31:37
 * @desc [Solved socket issue for running in only one file with class and constructor call]
 */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const useragent = require("express-useragent");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const { IMG, PORT } = require("./config");

const app = express();

const server = require("http").Server(app);
// All routes required
const commonRoute = require("./route/common");
const authRoute = require("./route/auth");
const { requireSignIn } = require("./controllers/middleware/midd_control");
const SocketService = require("./route/socket");

let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(cors());
app.use(useragent.express());
app.use(express.urlencoded({ limit: `${IMG.size}`, extended: true }));
app.use(express.json({ limit: `${IMG.size}` }));
app.use(express.static("public"));
app.use(express.static("views"));
app.set("view engine", "ejs");
app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet());

app.get("/", (req, res) => {
  res.send(req.useragent);
});

//NOTE: Common Route
app.use("/api", commonRoute);

//NOTE: Auth Route
app.use("/auth", requireSignIn, authRoute);

const port = PORT || 5000;

// const cluster = require("cluster");
// const numCPUs = require("os").cpus().length;

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     cluster.fork();
//   });
// } else {

//   console.log(`Worker ${process.pid} started`);
// }

server.listen(port, () => console.log(`Server started at:${port}`));

app.set("socketService", new SocketService(server));
