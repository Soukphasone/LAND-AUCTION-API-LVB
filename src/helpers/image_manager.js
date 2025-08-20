const db = require("../models");
const DB = db.auction;
const fs = require("fs");
const path = require("path");

async function cleanUpUnlinkedImages() {
  const folderPath = path.join(__dirname, "../../uploads");
  try {
    const records = await DB.find({}, { "LAND_DETAILS.IMAGES": 1 });
    const dbImageNames = new Set();
    records.forEach((doc) => {
      const images = doc.LAND_DETAILS?.IMAGES;
      if (images?.PROFILE_IMAGE) {
        dbImageNames.add(images.PROFILE_IMAGE);
      }
      if (Array.isArray(images?.DETAILS_IMAGE)) {
        images.DETAILS_IMAGE.forEach((img) => {
          if (img.url) dbImageNames.add(img.url);
        });
      }
    });
    const filesInFolder = fs.readdirSync(folderPath);
    filesInFolder.forEach((file) => {
      if (!dbImageNames.has(file)) {
        const filePath = path.join(folderPath, file);
        fs.unlinkSync(filePath);
        console.log("Deleted:", file);
      }
    });
    console.log("Cleanup complete.");
  } catch (err) {
    console.error("Error during cleanup:", err.message);
  }
}

module.exports = {
  cleanUpUnlinkedImages,
};
