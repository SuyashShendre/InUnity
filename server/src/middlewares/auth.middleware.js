const JWT = require("jsonwebtoken");
const userModel = require("../models/users.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth failed",
        });
      } else {
        const userId = decode.id;
        if (!userId || Date(decode.exp) < Date.now()) {
          return res.status(401).send({
            success: false,
            message: "Invalid Token",
          });
        }

        user = await userModel.findById(userId);
        req.user = user;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Auth Middleware",
      error,
    });
  }
};
