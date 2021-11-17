const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../validation/ctrlWrapper");
const validation = require("../../validation/validation");
const { auth: ctrl } = require("../../controllers");
router.post("/register", ctrlWrapper(ctrl.register));
module.exports = router;
