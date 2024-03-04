const controller = require("../controllers/report.controller");
// const { verifyToken } = require("../middlewares");

module.exports = async (app) => {
  app.get("/reportamout", controller.ReportAmout);
  app.post("/package", controller.packageCreate);
  app.get("/package/:id", controller.package);
  app.put("/package/:id", controller.packageUpdate);
  app.delete("/package/:id", controller.packageDelete);
};
