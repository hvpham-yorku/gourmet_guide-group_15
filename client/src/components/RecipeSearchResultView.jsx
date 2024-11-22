import { useEffect, useState } from "react";

import { getRecipeQuery } from "@/api/recipeApi";

function RecipeSearchResultView({ query }) {
	const [searchResults, setSearchResults] = useState([]);
	const [searchLoading, setSearchLoading] = useState(false);
	const [searchError, setSearchError] = useState(null);

	useEffect(() => {
		if (query.length === 0) {
			setSearchResults([]);
			return;
		}

		const fetchData = async () => {
			setSearchLoading(true);
			setSearchError(null);

			try {
				const res = await getRecipeQuery(query);
				setSearchResults(res.data.meals);
			} catch (err) {
				setSearchError(`Recipe fetch failed (Status Code: ${err.response.status} `);
			} finally {
				setSearchLoading(false);
			}
		};

		fetchData();
	}, [query]);

	return (
		<div>
			{searchLoading && <p>Loading...</p>}
			{searchError && <p style={{ color: "red" }}>{searchError}</p>}
			<p>{searchResults.length > 0 && searchResults[0].strMeal}</p>
			{/* <ul>
				{data.split("").map((char, i) => {
					console.log(`${char} re-render?`);
					return <li key={i}>{char}</li>;
				})}
			</ul> */}
		</div>
	);
}

export default RecipeSearchResultView;
