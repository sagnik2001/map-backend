const express = require("express")
const bodyParser = require("body-parser");
const { connectDB } = require("./database/mongo.js");

const cors = require("cors")

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

require('dotenv').config()
let PORT = process.env.PORT || 8080

connectDB()

app.use("/", require("./routes/authRoutes.js"))
app.use("/api/",require("./routes/mapRoutes.js"))

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})



