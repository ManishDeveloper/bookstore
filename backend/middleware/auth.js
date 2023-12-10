const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  try {
    let token = req.header("auth-token");

    if (!token) {
      return res
        .status(400)
        .json({ success: false, error: "No Token! Authentication Denied!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, error: "Token is failed" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    console.log("something wrong with middleware");
    return res.status(500).json({ success: false, error: "server error" });
  }
};
