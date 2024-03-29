const express = require('express')
const router = express.Router()
const Meal = require("../models/meal")

// Getting all
router.get("/", async (req, res) => {
    console.log("getting all")
    try {
        const meal = await Meal.find()
        res.json(meal)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one 
router.get("/:id", async (req, res) => {
    console.log("getting one")
    const id = req.params.id
    try {
        const meal = await Meal.find(
            { _id: id }
        );
        res.json(meal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Creating one
router.post("/", async (req, res) => {
    console.log("creating one")

    const meal = new Meal({
        name: req.body.name,
        img: req.body.img,
        ingredients: req.body.ingredients,
        link: req.body.link,
        instructions: req.body.instructions
    })
    console.log(meal)
    try {
        const newMeal = await meal.save()
        res.status(201).json(newMeal)
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

// }
// )

// Updateing lastUse
router.put("/:id", async (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    // const { objectId, newDate } = req.body;
    const { newDate } = req.body;
    const id = req.params.id
    console.log(newDate)
    console.log(id)
    try {
        const updatedObject = await Meal.findByIdAndUpdate(id, {
            $set: { lastUse: newDate },
        }, { new: true });
        console.log(updatedObject)
        res.status(202).json(updatedObject);
    } catch (error) {
        console.error('Error updating object:', error);
        res.status(500).json({ error: 'An error occurred while updating the object.' });
    }
})

// Deleting one
router.delete("/:id", async (req, res) => {
    console.log("deleting one")

    const id = req.params.id
    try {
        const response = await Meal.deleteOne({ _id: id })
        res.status(201).json(response)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
module.exports = router