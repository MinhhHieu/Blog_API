const blogRoute = require("./blog.route");
const userRoute = require("./user.route");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/blogs", blogRoute);

  app.use(version + "/users", userRoute);
}