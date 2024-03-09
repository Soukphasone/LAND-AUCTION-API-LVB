const controller = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares");

module.exports = async (app) => {
  app.get("/users", verifyToken,controller.users);
  app.post("/user",controller.userCreate);
  app.get("/user/:id", verifyToken,controller.user);
  app.put("/user/:id", verifyToken,controller.userUpdate);
  app.delete("/user/:id", verifyToken,controller.userDelete);
};
