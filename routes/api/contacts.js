const express = require("express");
const router = express.Router();
const { contacts: ctr } = require("../../controllers");
const ctrlWrapper = require("../../validation/ctrlWrapper");
const { schemaAdd, schemaUpdate } = require("../../validation/JoiSchema");
const validation = require("../../validation/validation");
const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, ctrlWrapper(ctr.getAllContacts));

router.get("/:contactId", authenticate, ctrlWrapper(ctr.getContactById));

router.post(
  "/",
  authenticate,
  validation(schemaAdd),
  ctrlWrapper(ctr.addContact),
);

router.delete("/:contactId", authenticate, ctrlWrapper(ctr.deleteContact));

router.put(
  "/:contactId",
  authenticate,
  validation(schemaUpdate),
  ctrlWrapper(ctr.updateContactById),
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(schemaUpdate),
  ctrlWrapper(ctr.updateFavorite),
);

module.exports = router;
