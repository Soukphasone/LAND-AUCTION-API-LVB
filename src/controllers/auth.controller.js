const jwt = require("jsonwebtoken");
const { checkUser } = require("../helpers/check_user");
const { handleResponse } = require("../helpers/handler.response");

exports.login = async (req, res) => {
  try {
    const user = req.body.USER_NAME;
    const password = req.body.PASSWORD;
    if (!user || !password) {
      return res
        .status(400)
        .json(handleResponse("1", 400, "PLEASE ENTER USERNAME AND PASSWORD"));
    }
    const _res = await checkUser(user, password);
    if (!_res.user_data) {
      return res
        .status(400)
        .json(handleResponse("1", 400, "CORRECT USERNAME OR PASSWORD"));
    }
    const TOKEN = jwt.sign(
      {
        USER: user,
        PASSWORD: password,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return res
      .status(200)
      .json(
        handleResponse("0", 200, "SUCCESS", { TOKEN, DATA: _res.user_data })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `SERVER_IS_PROBLEM: ${error}` });
    return res
      .status(500)
      .json(handleResponse("2", 500, "SERVER_IS_PROBLEM", error));
  }
};
