const express = require('express')
const router = express.Router()
const Meal = require("../models/meal")

// Getting all
router.get("/", async (req, res) => {
    try {
        const meal = await Meal.find()
        res.json(meal)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// Getting one 
router.get("/:id", getMeal, (req, res) => {
    res.send(res.meal)
})
// Creating one
router.post("/", async (req, res) => {
    const meal = new Meal({
        name: req.body.name,
        ingredients: req.body.ingredients
    })
    try {
        const newMeal = await meal.save()
        res.status(201).json(newMeal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one
router.patch("/:id", getMeal, async (req, res) => {
    if (req.body.name != null) { res.meal.name = req.body.name }
    if (req.body.ingredients != null) { res.meal.ingredients = req.body.ingredients }
    try {
        const updatedMeal = await res.meal.save()
        res.json(updatedMeal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

}
)
// Deleting one
router.delete("/:id", getMeal, async (req, res) => {
    try {
        await res.meal.deleteOne()
        res.json({ message: "Meal deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getMeal(req, res, next) {
    let meal
    try {
        meal = await Meal.findById(req.params.id)
        if (meal == null) return res.status(404).json({ message: "meal not found" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.meal = meal
    next()
}
module.exports = router