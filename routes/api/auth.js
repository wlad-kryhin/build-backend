const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../validation/ctrlWrapper");
// const validation = require("../../validation/validation");
const { auth: ctrl } = require("../../controllers");
const authenticate = require("../../middlewares/authenticate");

router.post("/signup", ctrlWrapper(ctrl.register));
router.post("/login", ctrlWrapper(ctrl.login));
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.get("/current", authenticate, ctrlWrapper(ctrl.current));

module.exports = router;
