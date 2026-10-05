const express = require("express");
const { userRegister, userLogin, userProfile, userLogout } = require("../controllers/auth.controllers");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
// user register route here
router.post("/register", userRegister)
// user login route here
router.post("/login", userLogin)
// user profile route here
router.get("/profile", authMiddleware, userProfile)
// user logout route here
router.post("/logout", authMiddleware, userLogout)
module.exports = router