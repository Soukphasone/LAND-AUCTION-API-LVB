const jwt = require("jsonwebtoken");
const { checkUser } = require("../helpers/check_user");
const { handleResponse } = require("../helpers/handler.response");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) return res.status(401).json(handleResponse("1", 401, "NOT_AUTHORIZATION"));
    const tokenSplit = token.split(" ");
    if (token.split(" ")[0] !== "LVB") {
      return res.status(403).json(handleResponse("1", 403, "INVALID_TOKEN"));
    }
    let userAuthData = jwt.verify(tokenSplit[1], process.env.SECRET_KEY);
    if (!userAuthData.USER) {
      return res.status(401).json(handleResponse("1", 401, "ACCESS_TOKEN_EXPIRED"));
    }
    let findUser = {};
    const check_user = await checkUser(userAuthData.USER, userAuthData.PASSWORD);
    findUser = { ...check_user.user_data };
    if (req.authorization) {
      const _check = req.authorization.includes(findUser.ROLE_ID);
      if (!_check) {
      return res.status(401).json(handleResponse("1", 401, "NOT_AUTHORIZATION"));
      }
    }
    req.payload = findUser;
    next();
  } catch (err) {
    return res.status(501).json(handleResponse("2", 501, "Internal Server Error", err.message));
    
  }
};

module.exports = verifyToken;
