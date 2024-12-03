import React, { useRef, useState } from "react";
import axios from "axios";
import "@/styles/AIRecipes.css";

const parseRecipeResponse = responseText => {
	return responseText.split("\n").filter(line => line.trim() !== ""); // Split by newlines and remove empty lines
};

const AIRecipes = () => {
	const [query, setQuery] = useState("");
	const [response, setResponse] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [parsedRecipe, setParsedRecipe] = useState(null); // Initialize parsedRecipe as state

	const prevQuery = useRef(query);

	const maxCharacters = 100;

	const handleSubmit = async e => {
		e.preventDefault();
		if (query.length > 0 && query !== prevQuery.current) {
			prevQuery.current = query;
			setIsLoading(true);

			try {
				const fullQuery = `${query}. Make it a recipe in as few words as possible.`;

				const res = await axios.post("http://localhost:3000/api/AIRecipes/ask", { query: fullQuery });
				setResponse(res.data.response);

				const parsed = parseRecipeResponse(res.data.response); // Parse the response
				setParsedRecipe(parsed); // Update parsedRecipe state
			} catch (error) {
				console.error(error);
				setResponse("Error contacting the bot.");
			} finally {
				setIsLoading(false);
			}
		}
	};

	const handleInputChange = e => {
		if (e.target.value.length > maxCharacters) {
			setResponse("Your input cannot exceed more than 100 characters!");
			setQuery(e.target.value.slice(0, maxCharacters));
		} else {
			setResponse("");
			setQuery(e.target.value);
		}
	};

	return (
		<div>
			<div className="hero">
				<h1 className="title">Gourmet Assistant</h1>
				<p className="description">Let our AI create the perfect recipe just for you!</p>
				<form className="prompt" onSubmit={handleSubmit}>
					<textarea
						placeholder="Enter your recipe request (max 100 characters)."
						value={query}
						onChange={handleInputChange}
						rows="5"
						cols="50"
					/>
					<br />
					<button className="submitbutton" type="submit" disabled={isLoading}>
						{isLoading ? "Loading..." : "Enter"}
					</button>
				</form>
			</div>
			{parsedRecipe && (
				<div className="response">
					<h3>Recipe Output:</h3>
					<ul>
						{parsedRecipe.map((line, index) => (
							<li key={index}>{line}</li>
						))}
					</ul>
				</div>
			)}

			{!isLoading && !parsedRecipe && response && <p>{response}</p>}
		</div>
	);
};

export default AIRecipes;
