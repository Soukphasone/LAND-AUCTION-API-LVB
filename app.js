const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
require("./src/routes/incomes_expense.routes")(app);
require("./src/routes/report.routes")(app);
require("./src/routes/user.routes")(app);
require("./src/routes/auth.routes")(app);
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("SEVER_IS_RUNNING_ON_PORT:", port);
});
