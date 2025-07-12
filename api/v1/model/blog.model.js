const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    description: String,
    author: String,
    deleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema, "blogs");

module.exports = Blog;
