const blogRoute = require("./blog.route");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/blogs", blogRoute);
}