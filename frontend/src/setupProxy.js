const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target:
        process.env.ENVIRONMENT === "production"
          ? "https://math-node-backend.herokuapp.com"
          : "http://backend",
      pathRewrite: { "^/api": "" },
    }),
  );
};
