const controller = require("../controllers/auth.controller");
module.exports = async (app) => {
  app.post("/login", controller.login);
};
