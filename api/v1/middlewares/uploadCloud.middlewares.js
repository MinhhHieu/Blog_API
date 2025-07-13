const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const axios = require("axios");

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// End Cloudinary

module.exports.upload = async (req, res, next) => {
  try {
    // Trường hợp có file upload
    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) resolve(result);
            else reject(error);
          });
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();
      console.log(result.secure_url);
      req.body[req.file.fieldname] = result.secure_url;

      return next();
    }

    // Trường hợp upload qua URL
    if (req.body.image && typeof req.body.image === "string") {
      const imageUrl = req.body.image;

      const response = await axios({
        url: imageUrl,
        responseType: "arraybuffer",
      });

      const buffer = Buffer.from(response.data, "binary");

      const streamUploadFromUrl = () =>
        new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) resolve(result);
            else reject(error);
          });

          streamifier.createReadStream(buffer).pipe(stream);
        });

      const result = await streamUploadFromUrl();
      req.body.image = result.secure_url;
    }

    return next(); 
  } catch (error) {
    console.error("Upload middleware error:", error);
    return res.status(400).json({
      code: 400,
      message: "Lỗi upload ảnh!",
    });
  }
};
