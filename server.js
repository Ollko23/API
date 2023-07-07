require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use(cors({
    origin: "*"
}))
app.use(express.json())

const meals = require("./routes/meals")
const menu = require("./routes/menu")
const port = process.env.PORT || 3500
app.listen(port, () => { console.log("server started") })
app.use("/meals", meals)
app.use("/menu", menu)