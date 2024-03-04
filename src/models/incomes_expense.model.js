const mongoose = require("./mongoose");
const Schema = mongoose.Schema;

const incomes_Expense = mongoose.db.model(
  "incomes_Expense",
  new mongoose.Schema({
    user_id:{
      type: Schema.Types.ObjectId
    },
    amount_incomes: {
      type: Number,
  },
    amount_expenses: {
      type: Number,
  },
  description: {
      type: String,
  },
  type: String,
  date: {
      type: Date,
      default: Date.now
  },
    createBy: {
      type: Schema.Types.ObjectId,
    },
    updatedAt: Date,
    updatedBy: {
      type: Schema.Types.ObjectId,
    },
  })
);

module.exports = incomes_Expense;
