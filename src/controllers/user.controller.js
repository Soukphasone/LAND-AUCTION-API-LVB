const db = require("../models");
const User = db.user;
exports.users = async (req, res) => {
  try {
    let _skip = parseInt(req.query.skip) || 0;
    let _limit = parseInt(req.query.skip) || 50;

    const findby = req.query;

    if (findby.name) {
      findby.name = { $regex: findby.name };
    }

    delete findby.skip;
    delete findby.limit;

    const _users = await User.find({ ...findby })
      .skip(_skip)
      .limit(_limit)
      .select("-password");
    res.status(200).json(_users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.user = async (req, res) => {
  try {
    const _user = await User.findById({ _id: req.params.id }).select(
      "-password"
    );
    res.status(200).json(_user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.userCreate = async (req, res) => {
  try {
    if (!req.body.username && !req.body.password) {
      return res.status(400).json({ message: `ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ` });
    }

    const _checked_user = await User.findOne({ username: req.body.username }).exec();;
    if (_checked_user) {
      return res.status(400).json({ message: `ຊື່ນີ້ໄດ້ເຄີຍລົງທະບຽນແລ້ວ` });
    }
    const _createUser = await User.create({
      ...req.body,
    });
    res.status(200).json(_createUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.userUpdate = async (req, res) => {
  try {
    const _userUpdate = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          updatedAt: new Date(),
          updatedBy: req.payload.id,
        },
      }
    );
    const _user = await User.findOne({ _id: req.params.id });
    res.status(200).json(_user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.userDelete = async (req, res) => {
  try {
    const _userDelete = await User.remove({ _id: req.params.id });
    return res.status(200).json({ message: "Success!" });
  } catch (err) {
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
