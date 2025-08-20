const mongoose = require("./mongoose");
const Schema = mongoose.Schema;
const province = mongoose.db.model(
  "province",
  new Schema({
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    districts: [
      new Schema(
        {
          id: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
        },
        {
          _id: false,
        }
      ),
    ],
  })
);

module.exports = province;
