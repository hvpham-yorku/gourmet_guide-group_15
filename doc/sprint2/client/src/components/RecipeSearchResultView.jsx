import { useEffect, useState } from "react";

import { getRecipeQuery } from "@/api/recipeApi";

import "@/styles/SearchInterface.css";

function RecipeSearchResultView({ query }) {
	const [searchResults, setSearchResults] = useState({});
	const [searchLoading, setSearchLoading] = useState(false);
	const [searchError, setSearchError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (query.length === 0) {
			setSearchResults({});
			return;
		}

		const fetchData = async () => {
			setSearchLoading(true);
			setSearchError(null);

			try {
				const res = await getRecipeQuery(query, currentPage);
				setSearchResults(res.data);
			} catch (err) {
				setSearchError(`Recipe fetch failed (Status Code: ${err.response.status} ${err.response.statusText})`);
			} finally {
				setSearchLoading(false);
			}
		};

		fetchData();
	}, [query, currentPage]);

	return (
		<div>
			{searchLoading && <p>Loading...</p>}
			{searchError && <p style={{ color: "red", whiteSpace: "pre-line" }}>{searchError}</p>}
			{searchResults.meals?.length > 0 && (
				<div className="search-interface-results-container">
					{searchResults.meals.map(meal => (
						<div key={meal.idMeal} className="search-interface-result-item">
							<div className="search-interface-food-name">
								<img src={meal.strMealThumb} title={meal.strMeal} alt={meal.strMeal} width={128} height={128} />{" "}
								{meal.strMeal}
							</div>
							<div className="search-interface-food-category">Category: {meal.strCategory}</div>
						</div>
					))}
					{searchResults.paginationData && (
						<div className="search-interface-result-info">
							<div className="search-interface-navigation">
								{/* // TODO: Add onClick event that checks cache for previous or next page
									and if it doesnt exist, then make a new api request for previous or next page
									then add it to cache (probably localStorage or redis, not sure yet) */}
								<button className="search-interface-nav-button" onClick={() => setCurrentPage(currentPage - 1)}>
									&#10094;
								</button>
								{searchResults.paginationData.currentPage} / {searchResults.paginationData.totalPages}
								<button className="search-interface-nav-button" onClick={() => setCurrentPage(currentPage + 1)}>
									&#10095;
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default RecipeSearchResultView;
