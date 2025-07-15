module.exports.registerPost = (req, res, next) => {
  if (!req.body.fullName) {
    res.json({
      code: 400,
      message: "Vui lòng nhập họ tên!"
    });
    return;
  }

  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Vui lòng nhập email!"
    });
    return;
  }

  if (!req.body.password) {
    res.json({
      code: 400,
      message: "Vui lòng nhập mật khẩu!"
    });
    return;
  }
  if(!req.body.phone) {
    res.json({
      code: 400,
      message: "Vui lòng nhập số điện thoại!"
    });
    return
  }

  next();
};

module.exports.loginPost = (req, res, next) => {

  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Vui lòng nhập email!"
    });
    return;
  }

  if (!req.body.password) {
    res.json({
      code: 400,
      message: "Vui lòng nhập mật khẩu!"
    });
    return;
  }

  next();
};



