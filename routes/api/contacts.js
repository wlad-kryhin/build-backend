const express = require("express");
const router = express.Router();
const { contacts: ctr } = require("../../controllers");
const ctrlWrapper = require("../../validation/ctrlWrapper");
const { schemaAdd, schemaUpdate } = require("../../validation/JoiSchema");
const validation = require("../../validation/validation");

router.get("/", ctrlWrapper(ctr.getAllContacts));

router.get("/:contactId", ctrlWrapper(ctr.getContactById));

router.post("/", validation(schemaAdd), ctrlWrapper(ctr.addContact));

router.delete("/:contactId", ctrlWrapper(ctr.deleteContact));

router.put(
  "/:contactId",
  validation(schemaUpdate),
  ctrlWrapper(ctr.updateContactById),
);

router.patch(
  "/:contactId/favorite",
  validation(schemaUpdate),
  ctrlWrapper(ctr.updateFavorite),
);

module.exports = router;
