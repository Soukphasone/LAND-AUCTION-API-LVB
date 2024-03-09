const controller = require("../controllers/report.controller");
const { verifyToken } = require("../middlewares");

module.exports = async (app) => {
  app.get("/reportamout/day", controller.ReportAmoutDay);
  app.get("/reportamout/month", controller.ReportAmountThisMonth);
  app.get("/reportamout/year", controller.ReportAmountThisYear);
};
