const axios = require("axios");

async function checkUser(user, password) {
  try {
    const payload = {
      Project_id: "PRJ100000000095",
      Request: {
        RequestID: "3",
        Username: user,
        Password: password,
      },
    };
    const _res = await axios.post(process.env.LOGIN_URI, payload);
    return _res.data;
  } catch (err) {
    console.error("Error in checkUser:", err.message);
    return null;
  }
}

module.exports = {
  checkUser,
};
