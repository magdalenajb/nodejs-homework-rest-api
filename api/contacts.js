const express = require("express");
const { auth, validation } = require("../middlewares");
const router = express.Router();
const contactsTasks = require("../controller/contactsController");
const { joiSchema, favoriteJoiSchema } = require("../service/schemas/contactSchema");

router.get("/", auth, contactsTasks.listContacts);

router.get("/:contactId", contactsTasks.getContactById);

router.post("/", auth, validation(joiSchema), contactsTasks.createContact);

router.put("/:contactId", validation(joiSchema), contactsTasks.updateContact);

router.delete("/:contactId", contactsTasks.removeContact);

router.patch("/:contactId/favorite", validation(favoriteJoiSchema), contactsTasks.updateStatusContact);

module.exports = router;
