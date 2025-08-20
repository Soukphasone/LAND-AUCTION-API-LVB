const db = require("../models");
const DB = db.auction;
const { handleResponse } = require("../helpers/handler.response");
exports.uploadImage = async (req, res) => {
  try {
    const profileImage = req.files["PROFILE_IMAGE"]?.[0]?.filename || null;
    const detailImages = (req.files["DETAILS_IMAGE"] || []).map((file) => ({
      url: file.filename,
    }));
    console.log("Detail_images:", detailImages);
    // const _res = await DB.create({
    //   LAND_DETAILS: {
    //     ...req.body,
    //  IMAGES: {
        //   PROFILE_IMAGE: profileImage,
        //   DETAIL_IMAGE: detailImages,
        // },
    //     IMAGES: { ...req.body },
    //     CONTACT: { ...req.body },
    //   },
    //   ...req.body,
    // });
    res.status(200).json(handleResponse("0", 200, "SUCCESS", "OK"));
  } catch (err) {
    console.log(err);
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
