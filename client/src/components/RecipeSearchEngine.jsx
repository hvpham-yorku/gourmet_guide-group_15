import { useEffect, useState } from "react";

import useDebounce from "@/hooks/useDebounce";

/*
{
	dietary-restriction1: [ingredient1, ingredient2, ...],
	...: [...]
}
*/

function RecipeSearchEngine() {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query);

	useEffect(() => console.log(query), [query]);

	return (
		<input
			type="text"
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			placeholder="Search for your next recipe..."
		></input>
	);
}

export default RecipeSearchEngine;
