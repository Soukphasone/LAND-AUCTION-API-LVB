const controller = require("../controllers/auction.controller");
const { upload_auction } = require("../middlewares/upload");
const { verifyToken } = require("../middlewares");

module.exports = async (app) => {
  app.post("/auction/view", controller.auctionView);
  app.post("/auction/view/detail", controller.auctionViewDetail);
  app.post(
    "/auction/add",
    verifyToken,
    upload_auction.fields([
      { name: "PROFILE_IMAGE", maxCount: 1 },
      { name: "DETAILS_IMAGE", maxCount: 6 },
    ]),
    controller.auctionAdd
  );
  app.post("/province/add", controller.provinceAdd);
  app.post(
    "/auction/update",
    verifyToken,
    upload_auction.fields([
      { name: "PROFILE_IMAGE", maxCount: 1 },
      { name: "DETAILS_IMAGE", maxCount: 6 },
    ]),
    controller.auctionUpdate
  );
  app.post("/auction/delete", verifyToken, controller.auctionDelete);
  app.post("/village", controller.auctionSelectVillage);
  app.post("/district", controller.auctionSelectDistrict);
  app.post("/province", controller.auctionSelectProvince);
  app.post("/provinces", controller.provincesView);
  app.post("/select-all", controller.auctionSelect);
  app.post("/type", controller.auctionSelectType);
  app.post("/laos/address", controller.laosAddress);
  app.post("/icons", controller.icons);
};
