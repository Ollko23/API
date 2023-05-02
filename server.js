// require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')


console.log(process.env.DATABASE_URL)
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use(express.json())

const meals = require("./routes/meals")

app.listen(3000, () => { console.log("server started") })
app.use("/meals", meals)