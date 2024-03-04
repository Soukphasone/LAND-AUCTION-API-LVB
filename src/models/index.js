const mongoose = require("./mongoose");
const inc_exp = require("./incomes_expense.model");
const user = require("./user.model");
const db = {};
db.mongoose = mongoose;
db.inc_exp = inc_exp;
db.user = user;
module.exports = db;
