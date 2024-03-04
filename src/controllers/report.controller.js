const db = require("../models");
const Inc_Exp = db.inc_exp;
exports.ReportAmout = async (req, res) => {
  try {
    // const { status, userId } = req.query;
    const _amountIcm_Exp = await Inc_Exp.count().exec();
    res.status(200).json({
      totalamout: _amountIcm_Exp,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.package = async (req, res) => {
  try {
    const _package = await Package.findById({ _id: req.params.id });
    res.status(200).json(_package);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.packageCreate = async (req, res) => {
  try {
    const _packageCreate = await Package.create({
      ...req.body,
    });
    res.status(200).json(_packageCreate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.packageUpdate = async (req, res) => {
  try {
    await Package.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          createdOut: new Date(),
          // updatedBy: req.payload.id,
        },
      }
    );
    const _package = await Package.findOne({ _id: req.params.id });
    res.status(200).json(_package);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.packageDelete = async (req, res) => {
  try {
    await Package.remove({
      _id: req.params.id,
    });
    return res.status(200).json({ message: "Success!" });
  } catch (err) {
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
