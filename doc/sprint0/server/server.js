const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Recipe = require("./models/Recipe");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => {
		console.error("Connection to MongoDB errored:", err);
	});

app.post("/api/recipes", async (req, res) => {
	try {
		const recipe = new Recipe({
			name: req.body.name,
			description: req.body.description,
		});
		const savedRecipe = await recipe.save();
		res.status(201).json(savedRecipe);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

app.get("/api/recipes", async (req, res) => {
	try {
		const recipes = await Recipe.find();
		res.json(recipes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server sucessfully running on http://localhost:${process.env.SERVER_PORT}`);
});
