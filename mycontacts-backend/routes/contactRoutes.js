const express = require("express");

const router = express.Router();

const { createContact, getContact, putContact, delContact, getContacts } = require("../controller/contactController");

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(putContact).delete(delContact);

module.exports = router;