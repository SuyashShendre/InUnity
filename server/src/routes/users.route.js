const express = require("express");
const { register, login } = require("../controllers/users.controller");

const router = express.Router();

//Register || POST
router.post("/register", register);

//Login || POST
router.post("/login", login);

module.exports = router;
