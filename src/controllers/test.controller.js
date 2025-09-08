const { encryptData, decryptData } = require("../helpers/encrypt_decrypt");
exports.Test = async (req, res) => {
  try {
    console.log(req.body);
    // const encrypted = req.body.DATA;
    const testData = { data: "TEST_OK" };
    const _res = encryptData(testData);
    const decrypted = decryptData(req.body.DATA);
    console.log("data", decrypted);
    if (decrypted) {
      return res.status(200).json({
        ORIGINAL_DATA: decrypted,
        DATA_SEND_FROM_API: {
          data_1: testData.data,
          data_2: _res
        },
      });
    }
    return res.status(400).json("NULL");
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
