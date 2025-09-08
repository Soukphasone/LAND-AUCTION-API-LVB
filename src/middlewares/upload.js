const multer = require("multer");
const path = require("path");
const fs = require("fs");

const auction = path.join(__dirname, "../../uploads/autions");
if (!fs.existsSync(auction)) fs.mkdirSync(auction);
const storage_auction = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, auction);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});
const icons = path.join(__dirname, "../../uploads/icons");
if (!fs.existsSync(icons)) fs.mkdirSync(icons);
const storage_icons = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, icons);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload_auction = multer({ storage: storage_auction });
const upload_icons = multer({ storage: storage_icons });

module.exports = { upload_auction, upload_icons };
