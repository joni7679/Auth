const jwt = require("jsonwebtoken");
let generateToken =  (id) => {
    return jwt.sign({ id: id }, process.env.SECRET_KEY, { expiresIn: "3d" })
}
module.exports = generateToken
