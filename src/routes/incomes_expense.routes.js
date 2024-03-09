const controller = require("../controllers/incomes_expense.controller");
const { verifyToken } = require("../middlewares");
module.exports = async (app) => {
  app.get("/incomes_expense", controller.inc_exp);
  app.post("/incomes_expense",verifyToken, controller.Ic_expCreate);
};