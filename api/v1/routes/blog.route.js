 const express = require("express");
 const router = express.Router();

 const controller = require("../controller/blog.controller");

 router.get("/", controller.index);

 router.get("/detail/:id", controller.detail);

 module.exports = router;