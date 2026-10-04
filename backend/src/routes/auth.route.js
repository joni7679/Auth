const express = require("express");
const { userRegister, userLogin } = require("../controllers/auth.controllers");
const router = express.Router();
// user register route here
router.post("/register", userRegister)
// user login route here
router.post("/login", userLogin)
// user profile route here

// user logout route here


module.exports = router