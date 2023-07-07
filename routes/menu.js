const express = require('express')
const { ObjectId } = require('mongoose');
const router = express.Router()
const Menu = require("../models/menu")

// Getting one 
router.get("/:id", async (req, res) => {
    console.log("getting one")
    const id = req.params.id
    try {
        const meal = await Menu.findOne(
            {},
            { meals: { $elemMatch: { _id: id } } }
        );
        res.json(meal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Getting all
router.get("/", async (req, res) => {
    console.log("getting all")
    try {
        const meals = await Menu.find()
        res.json(meals)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Creating one
router.post("/", async (req, res) => {
    console.log("creating one")

    const newMeal = (
        {
            name: req.body.name,
            img: req.body.img,
            ingredients: req.body.ingredients,
            link: req.body.link,
            instructions: req.body.instructions
        }
    )
    try {
        const response = await Menu.findOneAndUpdate({}, { $push: { meals: newMeal } }, { new: true })
        const meals = response.meals
        const mealId = meals[meals.length - 1]._id.toString()
        res.status(201).json(mealId)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Menu order change
router.put("/", async (req, res) => {
    console.log("putting one")

    // const newMenu =
    // {
    //     name: req.body.name,
    //     img: req.body.img,
    //     ingredients: req.body.ingredients,
    //     link: req.body.link,
    //     instructions: req.body.instructions
    // }
    try {
        const response = await Menu.findOneAndUpdate({}, { meals: req.body }, { new: true })
        res.status(201).json(response)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one
// router.patch("/:id", async (req, res) => {
//     console.log("updating one")

//     if (req.body.name != null) { res.meal.name = req.body.name }
//     if (req.body.ingredients != null) { res.meal.ingredients = req.body.ingredients }
//     try {
//         const updatedMeal = await res.meal.save()
//         res.json(updatedMeal)
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }

// })
// Deleting one

router.delete("/:id", async (req, res) => {
    console.log("deleting one")
    const id = req.params.id
    try {
        const response = await Menu.updateOne(
            {},
            {
                $pull: {
                    meals: { _id: id }
                }
            },
            { new: true })
        res.json(response)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
module.exports = router