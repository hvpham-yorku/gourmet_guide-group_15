import { useState } from "react";

import RecipeSearchResultView from "@/components/RecipeSearchResultView";
import useDebounce from "@/hooks/useDebounce";

import "@/styles/RecipeSearchEngine.css";

function RecipeSearchEngine() {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query);

	return (
		<div className="searchEngineContainer">
			<input
				type="search"
				value={query}
				onChange={e => setQuery(e.target.value)}
				placeholder="Search for your next recipe..."
				autoFocus
			></input>

			<RecipeSearchResultView query={debouncedQuery} />
		</div>
	);
}

export default RecipeSearchEngine;

/*
mock of diertary restrictions table

{
	dietary-restriction1: [ingredient1, ingredient2, ...],
	...: [...]
}
*/
