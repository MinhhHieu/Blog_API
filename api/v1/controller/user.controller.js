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

// [POST] /api/v1/login
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại!"
    });
    return;
  };

  if (md5(password) !== user.password) {
    res.json({
        code: 400,
        message: "Sai mật khẩu!"
    });
    return;
  };

  const token = user.tokenUser;
  res.cookie("tokenUser", token);

  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
    tokenUser: token
  });
};
