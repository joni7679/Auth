const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

let authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "unauthorised  user"
            })
        }
        let decode = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userModel.findById(decode.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        req.user = user;
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

module.exports = authMiddleware