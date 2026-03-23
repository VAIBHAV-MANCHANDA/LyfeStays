const express = require("express");

const { loginUser, registerUser } = require("../controllers/authController");
const { validateEmailAndPassword } = require("../middleware/authValidation");

const router = express.Router();

router.post("/register", validateEmailAndPassword, registerUser);
router.post("/login", validateEmailAndPassword, loginUser);

module.exports = router;
