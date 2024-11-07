const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
	name: String,
	description: String,
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recipe", recipeSchema);
