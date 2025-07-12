const Blog = require("../model/blog.model");

const searchHelper = require("../../../helpers/search");
const paginationHelper = require("../../../helpers/pagination");

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

    // Pagination
    let initPagination = {
        currentPage: 1,
        limitItems: 3
    };
    const countBlog = await Blog.countDocuments(find);
    const objectPagination = paginationHelper(
        initPagination,
        req.query,
        countBlog
    );
    // End Pagination

    // Sort
    const sort = {};

    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    };
    // End Sort

    const blogs = await Blog.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

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

// [POST] /api/v1/blogs/create
module.exports.createPost = async (req, res) => {
  try {
    const blogs = new Blog(req.body);
    const data = blogs.save();
    res.json({
      code: 200,
      message: "Tạo thành công!",
      data: data
    });
  } catch (error) {
    res.json({
        code: 400,
        message: "Error!!"
    });
  }
};

// [PATCH] /api/v1/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    await Blog.updateOne({ _id: id }, req.body);

    res.json({
      code: 200,
      message: "Sửa thành công!"
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Error!!"
    });
  }
};

