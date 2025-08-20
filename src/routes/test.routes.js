const controller = require("../controllers/test.controller");
const { verifyToken } = require("../middlewares");

module.exports = async (app) => {
  app.post("/test", controller.Test);
};
module.exports = async (app) => {
  app.get("/data", controller.TestData);
};
