const db = require("../models");
const { encryptData, decryptData } = require("../helpers/encrypt_decrypt");
exports.Test = async (req, res) => {
  try {
    const encrypted = req.body.DATA;
    const testData = { data: "TEST" };
    const _res = encryptData(testData);
    const decrypted = decryptData(req.body.DATA);
    if (decrypted) {
      res.status(200).json({
        encrypted,
        decrypted,
        ORIGINAL_DATA: testData,
        DATA: _res,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Internal Server Error: ${err.message}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.TestData = async (req, res) => {
  try {
    res.status(200).json({
      data: "SOUKPHASONE",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Internal Server Error: ${err.message}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};