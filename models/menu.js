const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema({

    meals: [
        {
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
                required: true
            }
        }]
})

module.exports = mongoose.model("Menu", menuSchema)