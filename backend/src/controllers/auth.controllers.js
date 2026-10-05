const validator = require("validator");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");
const generateToken = require("../utils/generateToken");

const isProducation = process.env.NODE_ENV === "production";

// user register logic here
exports.userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields is required"
            })
        }
        if (name.length < 3) {
            return res.status(400).json({
                success: false,
                message: "name must be 3 characters "
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "email id is invalid format"
            })
        }
        if (!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            return res.status(400).json({
                message: "please enter password must 8 charters at lest one Upeercae , One Number , One symbols"
            })
        }
        let isAlreadyExist = await userModel.findOne({ email })
        if (isAlreadyExist) {
            return res.status(400).json({
                success: false,
                message: "email id already exist"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        let user = await userModel.create({ name, email, password: hashPassword });
        let token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProducation ? true : false,
            sameSite: isProducation ? "none" : "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000,
            path: "/",
        })
        res.status(201).json({
            success: true,
            message: "user register successfully",
            data: {
                name: user.name,
                id: user._id,
                email: user.email
            },

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}
// user login logic here
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email and password must be required"
            })
        }
        let user = await userModel.findOne({ email })
        if (!user) {
            return res.status(409).json({
                success: false,
                message: "email id not register"
            })
        }
        let isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong Password"
            })
        }
        let token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProducation ? true : false,
            sameSite: isProducation ? "none" : "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000,
            path: "/",
        })
        return res.status(200).json({
            success: true,
            message: "user login successfully",
            data: {
                name: user.name,
                id: user._id,
                email: user.email
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}
// user profile logic here
exports.userProfile = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "user profile successfully",
            data: req.user,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}
// user logout logic here
exports.userLogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProducation ? true : false,
            sameSite: isProducation ? "none" : "lax",
            path: "/",
        })
        return res.status(200).json({
            success: true,
            message: "user Logout successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}