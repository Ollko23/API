const mongoose = require("mongoose")

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    }

})

module.exports = mongoose.model("Meal", mealSchema)