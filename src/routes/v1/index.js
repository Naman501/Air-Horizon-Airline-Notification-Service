const express = require("express");
const router = express.Router();
const { infoController, emailController } = require("../../controllers");
const { ticketMiddleware } = require("../../middlewares");

router.get("/info", infoController.info);

router.post(
  "/tickets",
  ticketMiddleware.validateCreateRequest,
  emailController.create,
);

module.exports = router;
