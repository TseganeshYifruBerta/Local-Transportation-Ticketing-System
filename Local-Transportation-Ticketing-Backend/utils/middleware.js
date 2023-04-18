const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/utils");

const auth = async function (req, res, next) {
    let token = req.header("Authorization");
    if (!token) return sendResponse(res, 401, null, { message: "Access denied" });
    try {
      token = token.split(" ")[1];
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      if (verified.Role == "Admin") {
        req.user = verified;
        req.user.Id = verified._id;
        req.user.Role = verified.Role;
        return next();
      }}catch (err) {
        sendResponse(res, 400, null, { message: "Invalid token" });
      }};

      module.exports.auth = auth;