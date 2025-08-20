const express = require("express"); 
const controller = require("../controllers/upload.controller");
const { verifyToken } = require("../middlewares");
const upload = require("../middlewares/upload");

module.exports = async (app) => {
  app.post(
    "/upload",
   upload.fields([
    { name: "PROFILE_IMAGE", maxCount: 1 },
    { name: "DETAILS_IMAGE", maxCount: 6 },
  ]),
    controller.uploadImage
  );
  app.use("/uploads", express.static("uploads"));
};
