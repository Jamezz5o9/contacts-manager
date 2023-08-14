const express = require("express");

const router = express.Router();

const { createContact, getContact, putContact, delContact, getContacts } = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(putContact).delete(delContact);

module.exports = router;