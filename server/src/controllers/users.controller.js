const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already registered",
      });
    }

    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.email = req.body.email.toLowerCase();
    req.body.password = hashedPassword;

    const user = new userModel(req.body);
    await user.save();

    return res.status(200).send({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
        user,
      });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(404).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        status_code: 200,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "20h",
      }
    );

    const userData = await userModel
      .findOne({
        email: req.body.email.toLowerCase(),
      })
      .select("-password");

    return res.status(200).send({
      success: true,
      message: "Login successfully",
      token: token,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { register, login };
