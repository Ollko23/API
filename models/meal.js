const mongoose = require("mongoose")

const mealSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("meals", mealSchema)