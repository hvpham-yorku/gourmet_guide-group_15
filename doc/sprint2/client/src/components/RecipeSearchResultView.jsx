import { useEffect, useRef, useState } from "react";

import { getRecipeQuery } from "@/api/recipeApi";

import "@/styles/SearchInterface.css";

function RecipeSearchResultView({ query }) {
	const [searchResults, setSearchResults] = useState({});
	const [searchLoading, setSearchLoading] = useState(false);
	const [searchError, setSearchError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const recipePagesCache = useRef(new Map());
	const previousQuery = useRef(query);

	const MAX_CACHE_SIZE = 10;

	useEffect(() => {
		setSearchError(null);
		if (currentPage > 1 && query !== previousQuery.current) {
			previousQuery.current = query;
			setCurrentPage(1);
			return;
		}

		if (query.length === 0) {
			setSearchResults({});
			return;
		}

		console.log("ran");

		const pageKey = `${query}_${currentPage}`;
		const cachedPage = recipePagesCache.current.get(pageKey);
		if (cachedPage) {
			setSearchResults(cachedPage);
			return;
		}
		console.log("ran2");
		const fetchData = async () => {
			setSearchLoading(true);
			try {
				const res = await getRecipeQuery(query, currentPage);
				setSearchResults(res.data);

				if (recipePagesCache.current.size + 1 > MAX_CACHE_SIZE) {
					recipePagesCache.current.delete(recipePagesCache.current.keys().next().value);
				}
				recipePagesCache.current.set(pageKey, res.data);
				previousQuery.current = query;
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
								<button
									className="search-interface-nav-button"
									disabled={searchResults.paginationData.currentPage <= 1}
									hidden={searchResults.paginationData.currentPage <= 1}
									onClick={() => setCurrentPage(searchResults.paginationData.currentPage - 1)}
								>
									&#10094;
								</button>
								{searchResults.paginationData.currentPage} / {searchResults.paginationData.totalPages}
								<button
									className="search-interface-nav-button"
									disabled={searchResults.paginationData.currentPage >= searchResults.paginationData.totalPages}
									hidden={searchResults.paginationData.currentPage >= searchResults.paginationData.totalPages}
									onClick={() => setCurrentPage(searchResults.paginationData.currentPage + 1)}
								>
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
