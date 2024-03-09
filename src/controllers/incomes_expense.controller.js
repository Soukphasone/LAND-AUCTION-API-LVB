const { default: mongoose } = require("mongoose");
const db = require("../models");
const Ic_Exp = db.inc_exp;

exports.inc_exp = async (req, res) => {
  try {
    let _skip = parseInt(req.query.skip) || 0;
    let _limit = parseInt(req.query.limit) || 100;
    const findby = req.query;
    if (findby.description) {
      findby.description = { $regex: findby.description};
    } else {
      delete findby.description
    }
    if (findby.type) {
      findby.type = { $regex: findby.type};
    } else {
      delete findby.type
    }
    delete findby.skip;
    delete findby.limit;

    const _search = await Ic_Exp.find({ ...findby })
      .skip(_skip)
      .limit(_limit)
      .exec();
    res.status(200).json(_search);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.Ic_expCreate = async (req, res) => {
  try {
    const _ic_exp = await Ic_Exp.create({
      ...req.body,
    });
    res.status(200).json(_ic_exp);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

