const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.user;

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: `NOT_AUTHORIZATION` });
    const tokenSplit = token.split(" ");
    if (token.split(" ")[0] !== "STORE") {
      return res.status(403).json({ message: "INVALID_TOKEN" });
    }

    let userAuthData = jwt.verify(tokenSplit[1], process.env.SECRET_KEY);
    let findUser = {};

    findUser = await User.findOne({ _id: userAuthData.id });
    if (!findUser) {
      const check_user = await checkAuth({
        _id: userAuthData.id,
        _token: tokenSplit[1],
      });
      if (check_user) {
        await UserApp.create({ ...check_user, _id: userAuthData.id });
        findUser = { ...check_user };
      }
    }
    if (!userAuthData.role) {
      return res.status(401).json({ message: `ACCESS_TOKEN_EXPIRED` });
    }

    // Authorization -->>
    if (req.authorization) {
      const _check = req.authorization.includes(findUser.role);
      if (!_check) {
        return res.status(401).json({ message: `NOT_AUTHORIZATION` });
      }
    }
    req.payload = findUser;
    next();
  } catch (err) {
    return res.status(501).json({
      error: true,
      message: `Internal Server Error:${err}`,
    });
  }
};

module.exports = verifyToken;
