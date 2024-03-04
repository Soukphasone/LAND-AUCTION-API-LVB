const controller = require("../controllers/incomes_expense.controller");
const { verifyToken } = require("../middlewares");
module.exports = async (app) => {
  app.get("/incomes_expense", controller.inc_exp);
  app.get("/store/:id", controller.store);
  app.post("/incomes_expense",verifyToken, controller.Ic_expCreate);
  app.put("/store/:id", controller.storeUpdate);
  app.delete("/store/:id", controller.storeDelete);
};