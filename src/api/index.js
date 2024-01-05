const express = require("express");
const router = express.Router();

const authRoutes = require("./auth/auth.routes");
const boardRoutes = require("./board/board.routes");
const cardRoutes = require("./card/card.routes");
const stateRoutes = require("./state/state.routes");
const { notImplemented } = require("./shared/utils.middlewares");
const { AUTH_FLOW } = require("./auth/auth.constants");

router.use(function corsMiddleware(req, res, next) {
  const method =
    req.method && req.method.toUpperCase && req.method.toUpperCase();

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (method === "OPTIONS") {
    res.header("Vary", "Access-Control-Request-Headers");
    res.statusCode = 204;
    res.setHeader("Content-Length", "0");

    return res.end();
  }

  next();
});

router.use("/auth", authRoutes);
router.use("/card", AUTH_FLOW, cardRoutes);
router.use("/state", AUTH_FLOW, stateRoutes);
router.use("/board", AUTH_FLOW, boardRoutes);
router.use("/team", AUTH_FLOW, notImplemented);
router.use("/health", function healthEndpoint(req, res) {
  res.statusCode = 200;
  return res.end();
});

module.exports = router;
