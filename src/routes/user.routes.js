const controller = require("../controllers/user.controller");
// const { verifyToken } = require("../middlewares");

module.exports = async (app) => {
  app.get("/users", controller.users);
  app.post("/user", controller.userCreate);
  app.get("/user/:id", controller.user);
  app.put("/user/:id", controller.userUpdate);
  app.delete("/user/:id", controller.userDelete);
  app.post("/invite-create-user", controller.inviteCreateStore);
};
