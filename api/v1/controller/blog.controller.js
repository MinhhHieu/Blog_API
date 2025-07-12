const Blog = require("../model/blog.model");

const searchHelper = require("../../../helpers/search");

// [GET] /api/v1/blogs
module.exports.index = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };

    // Search 
    let objectSearch = searchHelper(req.query);

    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    // End Search

    const blogs = await Blog.find(find);

    res.json(blogs);
  } catch (error) {
    res.json({
        code: 400,
        message: "Error"
    });
  }
};

// [GET] /api/v1/blogs/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;

    const blogs = await Blog.findOne({
        _id: id,
        deleted: false
    });

    res.json(blogs);
  } catch (error) {
    res.json({
        code: 400,
        message: "Not found!"
    });
  }
};