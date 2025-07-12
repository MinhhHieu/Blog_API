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