const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
const { cleanUpUnlinkedImages } = require("./src/helpers/image_manager");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

cron.schedule("0 0 * * *", () => {
  cleanUpUnlinkedImages();
});

require("./src/routes/auth.routes")(app);
require("./src/routes/test.routes")(app);
require("./src/routes/auction.routes")(app);
require("./src/routes/upload.routes")(app);
server.listen(port, () => {
  console.log("SEVER_IS_RUNNING_ON_PORT:", port);
});
