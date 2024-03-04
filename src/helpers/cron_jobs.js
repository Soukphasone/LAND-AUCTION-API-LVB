const db = require("../models");
const Store = db.store;

exports.Off_store = async () => {
  try {
    const _checkExpire = await Store.find({ expire: { $lt: new Date() } });

    for (let item of _checkExpire) {
      await Store.findOneAndUpdate({ _id: item._id }, { status: "Block" });
    }
  } catch (err) {
    return;
  }
};
