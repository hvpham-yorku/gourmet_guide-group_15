import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { getRecipeQuery } from "@/api/recipeApi";

import OpenNew from "@/assets/OpenInNew.svg?react";

import "@/styles/RecipeSearchResultView.css";
import SpinLoader from "./SpinLoader";

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

		previousQuery.current = query;

		if (query.length === 0) {
			setSearchResults({});
			return;
		}

		const pageKey = `${query}_${currentPage}`;
		const cachedPage = recipePagesCache.current.get(pageKey);
		if (cachedPage) {
			setSearchResults(cachedPage);
			return;
		}

		const fetchData = async () => {
			setSearchLoading(true);
			try {
				const res = await getRecipeQuery(query, currentPage);
				console.log(res.data);
				if (res.data.meals === null || res.data.meals.length === 0) {
					setSearchError("No results were found");
				} else {
					setSearchResults(res.data);

					if (recipePagesCache.current.size + 1 > MAX_CACHE_SIZE) {
						recipePagesCache.current.delete(recipePagesCache.current.keys().next().value);
					}
					recipePagesCache.current.set(pageKey, res.data);
				}
			} catch (err) {
				console.log(err);
				setSearchError(`Recipe fetch failed (Status Code: ${err.response.status} ${err.response.statusText})`);
			} finally {
				setSearchLoading(false);
			}
		};

		fetchData();
	}, [query, currentPage]);

	return (
		<>
			{searchLoading && <SpinLoader />}
			{searchError && (
				<p
					className="search-results-container"
					style={{ textAlign: "center", padding: "5px 0px", color: "red", whiteSpace: "pre-line" }}
				>
					{searchError}
				</p>
			)}
			{searchResults.meals?.length > 0 && (
				<div className="search-results-container">
					{searchResults.meals.map(meal => (
						<Link key={meal.idMeal} style={{ color: "inherit", textDecoration: "inherit" }} to={`/recipes/${meal.idMeal}`}>
							<SearchResultItem meal={meal} />
						</Link>
					))}
					{searchResults.paginationData && (
						<div className="search-result-nav">
							<button
								className="search-result-nav-button"
								disabled={searchResults.paginationData.currentPage <= 1}
								hidden={searchResults.paginationData.currentPage <= 1}
								onClick={() => setCurrentPage(searchResults.paginationData.currentPage - 1)}
							>
								&#10094;
							</button>
							{searchResults.paginationData.currentPage} / {searchResults.paginationData.totalPages}
							<button
								className="search-result-nav-button"
								disabled={searchResults.paginationData.currentPage >= searchResults.paginationData.totalPages}
								hidden={searchResults.paginationData.currentPage >= searchResults.paginationData.totalPages}
								onClick={() => setCurrentPage(searchResults.paginationData.currentPage + 1)}
							>
								&#10095;
							</button>
						</div>
					)}
				</div>
			)}
		</>
	);
}

function SearchResultItem({ meal }) {
	return (
		<div className="search-result-item">
			<img src={meal.strMealThumb} title={meal.strMeal} alt={meal.strMeal} width={96} height={96} />
			<div className="search-result-title">{meal.strMeal}</div>
			<div className="search-result-cuisine">{meal.strArea}</div>
			<OpenNew className="search-result-open" />
			<div className="search-result-category">Category: {meal.strCategory}</div>
		</div>
	);
}

export default RecipeSearchResultView;
