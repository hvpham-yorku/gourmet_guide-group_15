import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
	name: String,
	description: String,
	createdAt: { type: Date, default: Date.now },
});

export default model("Recipe", recipeSchema);
