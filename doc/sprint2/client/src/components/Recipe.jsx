import { getRecipeFromId } from "@/api/recipeApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Recipe() {
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecipe = async () => {
			setIsLoading(true);
			try {
				const res = await getRecipeFromId(recipeId);
				setRecipe(res.data);
				console.log(res.data);
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
			<p>loading</p>
		</div>
	);
}

export default Recipe;
