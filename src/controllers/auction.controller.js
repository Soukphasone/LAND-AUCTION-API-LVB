const db = require("../models");
const DB = db.auction;
const DB_province = db.province;
const DB_address = db.address;
const { encryptData, decryptData } = require("../helpers/encrypt_decrypt");
const { handleResponse } = require("../helpers/handler.response");
const { iconsView } = require("../helpers/image_manager");
exports.auctionView = async (req, res) => {
  try {
    const search = decryptData(req.body.DATA);
    const query = {};
    if (search.AREA_MIN && search.AREA_MAX) {
      query["LAND_DETAILS.AREA"] = {
        $gte: Number(search.AREA_MIN),
        $lte: Number(search.AREA_MAX),
      };
    } else if (search.AREA_MIN) {
      query["LAND_DETAILS.AREA"] = { $gte: Number(search.AREA_MIN) };
    } else if (search.AREA_MAX) {
      query["LAND_DETAILS.AREA"] = { $lte: Number(search.AREA_MAX) };
    }
    if (search.PRICE_MIN && search.PRICE_MAX) {
      query["LAND_DETAILS.PRICE"] = {
        $gte: Number(search.PRICE_MIN),
        $lte: Number(search.PRICE_MAX),
      };
    } else if (search.PRICE_MIN) {
      query["LAND_DETAILS.PRICE"] = { $gte: Number(search.PRICE_MIN) };
    } else if (search.PRICE_MAX) {
      query["LAND_DETAILS.PRICE"] = { $lte: Number(search.PRICE_MAX) };
    }
    for (const key in search) {
      if (
        !search[key] ||
        ["PRICE_MIN", "PRICE_MAX", "AREA_MIN", "AREA_MAX"].includes(key)
      )
        continue;
      if (["TEL", "EMAIL"].includes(key.toUpperCase())) {
        query[`LAND_DETAILS.CONTACT.${key}`] = {
          $regex: search[key],
          $options: "i",
        };
        query[`LAND_DETAILS.${key}`] = {
          $regex: search[key],
          $options: "i",
        };
      }
    }
    const _res = await DB.find(query);
    return res.json(handleResponse("0", 200, "SUCCESS", encryptData(_res)));
  } catch (err) {
    console.error(err);
    return res.status(500).json(handleResponse("2", 500, "FAIL", err.message));
  }
};
exports.auctionViewDetail = async (req, res) => {
  try {
    const id = req.body.ID;

    const _res = await DB.findOne({ _id: id });
    if (_res) {
      await DB.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            "LAND_DETAILS.VIEW_COUNT":
              (_res?.LAND_DETAILS?.VIEW_COUNT || 0) + 1,
          },
        },
        { new: true }
      );
    }

    res.status(200).json(handleResponse("0", 200, "SUCCESS", _res));
  } catch (err) {
    console.error(err);
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
exports.auctionSelectVillage = async (req, res) => {
  try {
    const _res = await DB.aggregate([
      {
        $group: {
          _id: "$LAND_DETAILS.VILLAGE",
        },
      },
      {
        $project: {
          _id: 0,
          VILLAGE: "$_id",
        },
      },
    ]);
    return res.status(200).json(handleResponse("0", 200, "SUCCESS", _res));
  } catch (err) {
    console.error(err);
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
exports.auctionSelectDistrict = async (req, res) => {
  try {
    const _res = await DB.aggregate([
      {
        $group: {
          _id: "$LAND_DETAILS.DISTRICT",
        },
      },
      {
        $project: {
          _id: 0,
          DISTRICT: "$_id",
        },
      },
    ]);
    res.status(200).json(handleResponse("0", 200, "SUCCESS", _res));
  } catch (err) {
    console.error(err);
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
exports.auctionSelectProvince = async (req, res) => {
  try {
    const _res = await DB.aggregate([
      {
        $group: {
          _id: "$LAND_DETAILS.PROVINCE",
        },
      },
      {
        $project: {
          _id: 0,
          PROVINCE: "$_id",
        },
      },
    ]);
    res.status(200).json(handleResponse("0", 200, "SUCCESS", _res));
  } catch (err) {
    console.error(err);
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
exports.auctionSelect = async (req, res) => {
  try {
    const { PROVINCE, DISTRICT } = req.body;
    const matchStage = {};
    if (PROVINCE) matchStage["LAND_DETAILS.PROVINCE"] = PROVINCE;
    if (DISTRICT) matchStage["LAND_DETAILS.DISTRICT"] = DISTRICT;
    const _res = await DB.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            VILLAGE: "$LAND_DETAILS.VILLAGE",
            DISTRICT: "$LAND_DETAILS.DISTRICT",
            PROVINCE: "$LAND_DETAILS.PROVINCE",
          },
        },
      },
      {
        $project: {
          _id: 0,
          VILLAGE: "$_id.VILLAGE",
          DISTRICT: "$_id.DISTRICT",
          PROVINCE: "$_id.PROVINCE",
        },
      },
    ]);

    return res.status(200).json(handleResponse("0", 200, "SUCCESS", _res));
  } catch (err) {
    console.error(err);
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
exports.auctionSelectType = async (req, res) => {
  try {
    const _res = await DB.aggregate([
      {
        $group: {
          _id: "$LAND_DETAILS.TYPE",
        },
      },
      {
        $project: {
          _id: 0,
          TYPE: "$_id",
        },
      },
    ]);
    res.status(200).json(handleResponse("0", 200, "SUCCESS", _res));
  } catch (err) {
    console.error(err);
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
exports.auctionAdd = async (req, res) => {
  try {
    const profileURL = req.files["PROFILE_IMAGE"]?.[0]?.filename || null;
    const detailsURL = (req.files["DETAILS_IMAGE"] || []).map((file) => ({
      url: file.filename,
    }));
    const _res = await DB.create({
      LAND_DETAILS: {
        ...req.body,
        IMAGES: {
          PROFILE_IMAGE: profileURL,
          DETAILS_IMAGE: detailsURL,
        },
        CONTACT: { ...req.body },
      },
      ...req.body,
    });
    res.status(200).json(handleResponse("0", 200, "SUCCESS", _res));
  } catch (err) {
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
exports.auctionUpdate = async (req, res) => {
  try {
    const id = req.body.ID;
    const _res = await DB.findOne({ _id: id });
    if (!_res) {
      return res.status(404).json(handleResponse("0", 404, "NOT FOUND", null));
    }
    const profileURL = req.files["PROFILE_IMAGE"]?.[0]?.filename || null;
    const detailsURL = (req.files["DETAILS_IMAGE"] || []).map((file) => ({
      url: file.filename,
    }));
    const updatedImages = {
      PROFILE_IMAGE: profileURL || _res.LAND_DETAILS.IMAGES.PROFILE_IMAGE,
      DETAILS_IMAGE:
        detailsURL.length > 0
          ? detailsURL
          : _res.LAND_DETAILS.IMAGES.DETAILS_IMAGE,
    };
    await DB.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          LAND_DETAILS: {
            ...req.body,
            IMAGES: updatedImages,
            CONTACT: { ...req.body },
          },
          ...req.body,
          UPDATED_AT: new Date(),
        },
      }
    );

    const _data = await DB.findOne({ _id: id });
    res.status(200).json(handleResponse("0", 200, "SUCCESS", _data));
  } catch (err) {
    console.error(err);
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};

exports.auctionDelete = async (req, res) => {
  try {
    const _data = await DB.findOne({ _id: req.body.ID });
    res.status(200).json(handleResponse("0", 200, "SUCCESS", _data));
    await DB.deleteOne({ _id: req.body.ID });
  } catch (err) {
    console.log(err);
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
exports.provinceAdd = async (req, res) => {
  try {
    const _res = await DB_province.insertMany(req.body);
    res.status(200).json(handleResponse("0", 200, "SUCCESS", _res));
  } catch (err) {
    console.error(err);
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
exports.provincesView = async (req, res) => {
  try {
    const _res = await DB_province.find();
    return res.status(200).json(handleResponse("0", 200, "SUCCESS", _res));
  } catch (err) {
    console.error(err);
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
exports.laosAddress = async (req, res) => {
  try {
    const PROVINCE_ID = req.body.PROVINCE_ID || "";
    const DISTRICT_ID = req.body.DISTRICT_ID || "";
    const VILLAGE_ID = req.body.VILLAGE_ID || "";
    const query = {};
    if (PROVINCE_ID) query.province_id = PROVINCE_ID;
    if (DISTRICT_ID) query.district_id = DISTRICT_ID;
    if (VILLAGE_ID) query.village_id = VILLAGE_ID;
    const _res = await DB_address.find(query).toArray();
    return res.status(200).json(handleResponse("0", 200, "SUCCESS", _res));
  } catch (err) {
    console.error(err);
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
exports.icons = async (req, res) => {
  try {
    const _res = await iconsView();
    res.status(200).json(handleResponse("0", 200, "SUCCESS", _res));
  } catch (err) {
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
exports.iconsImgAdd = async (req, res) => {
  try {
    const profileURL = req.files["PROFILE_IMAGE"]?.[0]?.filename || null;
    const detailsURL = (req.files["DETAILS_IMAGE"] || []).map((file) => ({
      url: file.filename,
    }));
    // const _res = await DB.create({
    //   LAND_DETAILS: {
    //     ...req.body,
    //     IMAGES: {
    //       PROFILE_IMAGE: profileURL,
    //       DETAILS_IMAGE: detailsURL,
    //     },
    //     CONTACT: { ...req.body },
    //   },
    //   ...req.body,
    // });
    res.status(200).json(handleResponse("0", 200, "SUCCESS", _res));
  } catch (err) {
    return res.status(500).json(handleResponse("0", 500, "FAIL", err.message));
  }
};
