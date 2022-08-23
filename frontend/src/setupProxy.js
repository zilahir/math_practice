const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports =
  process.env.NODE_ENV === "production"
    ? function (app) {
        app.use(
          "/api",
          createProxyMiddleware({
            target: "http://backend",
            pathRewrite: { "^/api": "" },
          }),
        );
      }
    : () => {};
