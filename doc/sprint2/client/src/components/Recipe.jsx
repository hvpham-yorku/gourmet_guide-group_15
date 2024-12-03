import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Recipe() {
	const { recipeId } = useParams();
	const [isLoading, setIsLoading] = useState(true);

	console.log("rerendered");

	useEffect(() => {
		setIsLoading(true);
		console.log("lol");
	}, [recipeId]);

	return <div className="recipe">{isLoading && <p>Loading... {recipeId}</p>}</div>;
}

export default Recipe;
