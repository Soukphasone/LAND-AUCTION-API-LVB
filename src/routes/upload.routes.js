const express = require("express"); 
const controller = require("../controllers/upload.controller");
const { verifyToken } = require("../middlewares");
// const upload = require("../middlewares/upload");

module.exports = async (app) => {
  app.use("/uploads", express.static("uploads"));
};
