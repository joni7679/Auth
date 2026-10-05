const express = require('express');
const app = express()
const port = 3000;
const authRoute = require("./src/routes/auth.route");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
dotenv.config();
const connectedToDb = require("./src/db/db")
// middelware
app.use(cors({
    origin: process.env.CLIENT_URL || " http://localhost:5173/",
    credentials: true
}))
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.get('/', (req, res) => {
    res.send('backend server is running')
})
connectedToDb()
app.use("/api/auth", authRoute)
app.listen(port, () => {
    console.log(`auth app listening on port ${port}`)
})