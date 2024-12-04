import { getRecipeFromId } from "@/api/recipeApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpinLoader from "./SpinLoader";

import "@/styles/Recipe.css";

function Recipe() {
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const ingredientEntries = Object.entries(recipe).filter(entry => entry[0].includes("strIngredient") && entry[1].length > 0);
	const measurementEntries = Object.entries(recipe).filter(entry => entry[0].includes("strMeasure") && entry[1].length > 0);

	useEffect(() => {
		const fetchRecipe = async () => {
			setIsLoading(true);
			try {
				const res = await getRecipeFromId(recipeId);
				setRecipe(res.data.meals[0]);
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecipe();
	}, [recipeId]);

	return (
		<div className="recipe">
			{isLoading && <SpinLoader />}
			<h1>{recipe.strMeal}</h1>
			<h3>Category: {recipe.strCategory}</h3>
			<h3>Cuisine: {recipe.strArea}</h3>
			<a href={recipe.strSource}>
				<p>Source</p>
			</a>
			<a href={recipe.strYoutube}>
				<p>Watch a guide on YouTube!</p>
			</a>
			<img src={recipe.strMealThumb} />
			<h3>Required Ingredients:</h3>
			<ol>
				{ingredientEntries.map(([_, ingredient], i) => (
					<li key={i}>
						{measurementEntries[i][1]} {ingredient}
					</li>
				))}
			</ol>
			<h3>Instructions:</h3>
			<p>{recipe.strInstructions}</p>
		</div>
	);
}

export default Recipe;
