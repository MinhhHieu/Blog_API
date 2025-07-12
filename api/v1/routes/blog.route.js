const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const uploadCloud = require("../middlewares/uploadCloud.middlewares");

const controller = require("../controller/blog.controller");

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.post(
  "/create",
  upload.single("image"),
  uploadCloud.upload,
  controller.createPost
);

module.exports = router;
