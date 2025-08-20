const mongoose = require("./mongoose");
const Schema = mongoose.Schema;
const auction = mongoose.db.model(
  "auction",
  new Schema({
    LAND_DETAILS: new Schema(
      {
        VILLAGE: { type: String },
        DISTRICT: { type: String },
        PROVINCE: { type: String },
        AREA: { type: Number },
        PRICE: { type: Number },
        CURRENCY: { type: String },
        TYPE: { type: String },
        DESCRIPTION: { type: String },
        VIEW_COUNT: { type: Number, default: 0 },
        IMAGES: new Schema(
          {
            PROFILE_IMAGE: { type: String },
            DETAILS_IMAGE: {
              type: [Object],
              validate: {
                validator: function (arr) {
                  return arr.length <= 6;
                },
                message: "LIMIT MAX 6 IMAGES",
              },
            },
          },
          { _id: false }
        ),
        ROAD_TYPE: { type: String },
        MAP_LOCATION: { type: String },
        CONTACT: new Schema(
          {
            TEL: { type: String },
            EMAIL: { type: String },
          },
          { _id: false }
        ),
      },
      { _id: false }
    ),
    CREATED_AT: {
      type: Date,
      default: Date.now,
    },
    CREATED_BY: { type: String },
    UPDATED_AT: { type: Date },
    UPDATED_BY: { type: String },
  })
);

module.exports = auction;
