const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../validation/ctrlWrapper");
const validation = require("../../validation/validation");
const { auth: ctrl } = require("../../controllers");
const { schemaAuth } = require("../../validation/JoiSchema");
const authenticate = require("../../middlewares/authenticate");

router.post("/signup", validation(schemaAuth), ctrlWrapper(ctrl.register));
router.post("/login", validation(schemaAuth), ctrlWrapper(ctrl.login));
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.get("/current", authenticate, ctrlWrapper(ctrl.current));

module.exports = router;
