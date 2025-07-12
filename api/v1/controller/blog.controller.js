const Blog = require("../model/blog.model");

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };

    const blogs = await Blog.find(find);

    res.json(blogs);
}