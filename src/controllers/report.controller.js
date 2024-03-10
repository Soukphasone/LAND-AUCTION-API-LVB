const db = require("../models");
const Inc_Exp = db.inc_exp;
const today = new Date();
exports.ReportAmoutDay = async (req, res) => {
  try {
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    const _reportDay = await Inc_Exp.aggregate([
      {
        $match: {
          date: { $gte: startOfDay, $lt: endOfDay },
        },
      },
      {
        $group: {
          _id: "$user_id",
          Total_Inc: {
            $sum: {
              $cond: [{ $eq: ["$type", "ລາຍຮັບ"] }, "$amount_incomes_exp", 0],
            },
          },
          Total_Exp: {
            $sum: {
              $cond: [{ $eq: ["$type", "ລາຍຈ່າຍ"] }, "$amount_incomes_exp", 0],
            },
          },
        },
      },
    ]);
    res.status(200).json(_reportDay);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.ReportAmountThisMonth = async (req, res) => {
  try {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Get the last day of the current month
    const _reportMonth = await Inc_Exp.aggregate([
      {
        $match: {
          date: { $gte: startOfMonth, $lt: endOfMonth },
        },
      },
      {
        $group: {
          _id: "$user_id",
          Total_Inc: {
            $sum: {
              $cond: [{ $eq: ["$type", "ລາຍຮັບ"] }, "$amount_incomes_exp", 0],
            },
          },
          Total_Exp: {
            $sum: {
              $cond: [{ $eq: ["$type", "ລາຍຈ່າຍ"] }, "$amount_incomes_exp", 0],
            },
          },
        },
      },
    ]);
    res.status(200).json(_reportMonth);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.ReportAmountThisYear = async (req, res) => {
  try {
    const startOfYear = new Date(today.getFullYear(), 0, 1); // January 1st of the current year
    const endOfYear = new Date(today.getFullYear() + 1, 0, 1); // January 1st of the next year
    const _reportYear = await Inc_Exp.aggregate([
      {
        $match: {
          date: { $gte: startOfYear, $lt: endOfYear },
        },
      },
      {
        $group: {
          _id: "$user_id",
          Total_Inc: {
            $sum: {
              $cond: [{ $eq: ["$type", "ລາຍຮັບ"] }, "$amount_incomes_exp", 0],
            },
          },
          Total_Exp: {
            $sum: {
              $cond: [{ $eq: ["$type", "ລາຍຈ່າຍ"] }, "$amount_incomes_exp", 0],
            },
          },
        },
      },
    ]);
    res.status(200).json(_reportYear);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error: ${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
