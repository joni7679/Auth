const express = require('express');
const app = express()
const port = 3000;
const authRoute = require("./src/routes/auth.route");
const dotenv = require("dotenv");
dotenv.config();
const connectedToDb = require("./src/db/db")

// middelware
app.use(express.json())
app.get('/', (req, res) => {
    res.send('backend server is running')
})
connectedToDb()
app.use("/api/auth", authRoute)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})