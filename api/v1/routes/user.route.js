const express = require("express");
const router = express.Router();

const controller = require("../controller/user.controller");

const userValidate = require("../validates/user.validates");

router.post("/register", userValidate.registerPost,controller.register);

router.post("/login", userValidate.loginPost,controller.login);

module.exports = router;