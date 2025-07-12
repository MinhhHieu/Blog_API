const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const axios = require("axios");

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
// End Cloudinary

module.exports.upload = async (req, res, next) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      console.log(result.secure_url);
      req.body[req.file.fieldname] = result.secure_url;
      next();
    }

    upload(req);
  } else {
    next();
  }

  // gửi link ảnh qua JSON
    if (req.body.image && typeof req.body.image === "string") {
      const imageUrl = req.body.image;

      // Tải ảnh từ link
      const response = await axios({
        url: imageUrl,
        responseType: "arraybuffer",
      });

      const buffer = Buffer.from(response.data, "binary");

      // Upload buffer lên Cloudinary
      const streamUploadFromUrl = () =>
        new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) resolve(result);
            else reject(error);
          });

          streamifier.createReadStream(buffer).pipe(stream);
        });

      const result = await streamUploadFromUrl();

      // Gán lại URL đã upload vào body
      req.body.image = result.secure_url;
    }

    next();
};
