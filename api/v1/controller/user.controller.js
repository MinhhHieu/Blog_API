const md5 = require("md5");
const User = require("../model/user.model");

const generateHelper = require("../../../helpers/generate");

// [POST] /api/v1/register
module.exports.register = async (req, res) => {
  req.body.password = md5(req.body.password);

  const exitsEmail = await User.findOne({
    email: req.body.email,
    deleted: false
  });

  if (exitsEmail) {
    res.json({
      code: 400,
      message: "Email đã tồn tại!"
    });
  } else {
    const user = new User({
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      tokenUser: generateHelper.generateRandomString(30)
    });

    user.save();

    const token = user.tokenUser;
    res.cookie("tokenUser", token);

    res.json({
      code: 200,
      message: "Tạo tài khoản thành công!",
      tokenUser: token
    });
  };
};