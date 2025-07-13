module.exports.createPost = (req, res, next) => {
 if (!req.body.title) {
    res.json({
        code: 400,
        message: "Vui lòng nhập tiêu đề!"
    });
    return;
 };

 if (!req.body.image) {
    res.json({
        code: 400,
        message: "Vui lòng thêm ảnh!"
    });
    return;
 };

 if (!req.body.description) {
    res.json({
        code: 400,
        message: "Vui lòng nhập nội dung!"
    });
    return;
 };

 next();
};