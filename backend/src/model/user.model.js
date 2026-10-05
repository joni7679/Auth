const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        trim: true
    }
    ,
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },

}, { timestamps: true });


let userModel = new mongoose.model("User", userSchema);
module.exports = userModel