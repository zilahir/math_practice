const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target:
        process.env.NODE_ENV === "production"
          ? "https://math-node-backend.herokuapp.com"
          : "http://backend",
      pathRewrite: { "^/api": "" },
    }),
  );
};
