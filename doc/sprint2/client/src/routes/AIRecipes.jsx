import { useRef, useState } from "react";
import axios from "axios";
import "@/styles/AIRecipes.css";
import Chef from "@/assets/Chef.svg?react";

const parseRecipeResponse = responseText => {
	const parsedRecipe = {
		recipeName: "",
		sections: [],
		ingredients: [],
		instructions: [],
	};

	// Split response into lines and categorize them
	const lines = responseText.split("\n").filter(line => line.trim() !== "");

	let currentSection = ""; // Track whether we're in "Ingredients" or "Instructions"
	lines.forEach(line => {
		const listRemovedLine = line.replace(/^-?\s*(?:\d?[.)])?\s*-?/, "");

		const lowerCaseLine = listRemovedLine.toLowerCase();
		if (lowerCaseLine.includes("recipe") || lowerCaseLine.includes("name")) {
			parsedRecipe.recipeName = line.includes(":") ? line.split(":")[1] : line;
		} else if (lowerCaseLine.includes("ingredients")) {
			currentSection = "ingredients";
		} else if (lowerCaseLine.includes("instructions") || lowerCaseLine.includes("steps")) {
			currentSection = "instructions";
		} else if (currentSection === "ingredients") {
			const isIngredientSection = listRemovedLine.includes(":");
			if (isIngredientSection) {
				const sectionSplit = listRemovedLine.split(":");
				parsedRecipe.sections.push(`${sectionSplit[0]}:`);
				parsedRecipe.ingredients.push(`<section${parsedRecipe.sections.length - 1}/>`);
				console.log(parsedRecipe.sections[parsedRecipe.sections.length - 1].includes("\n"));
				if (sectionSplit[1]?.length > 0) {
					parsedRecipe.ingredients.push(sectionSplit[1]);
				}
			} else {
				parsedRecipe.ingredients.push(listRemovedLine);
			}
		} else if (currentSection === "instructions") {
			parsedRecipe.instructions.push(listRemovedLine);
		}
	});

	return parsedRecipe;
};

const AIRecipes = () => {
	const [query, setQuery] = useState("");
	const [response, setResponse] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [parsedRecipe, setParsedRecipe] = useState(null); // Initialize parsedRecipe as state
	const [dietaryRestriction, setDietaryRestriction] = useState(""); // Dietary restriction dropdown
	const [otherDietary, setOtherDietary] = useState(""); // "Other" input box
	const [ingredientsToAvoid, setIngredientsToAvoid] = useState(""); // Ingredients to avoid input
	const [history, setHistory] = useState([]); // State to store interaction history

	const prevQuery = useRef(query);

	const maxCharacters = 100;

	const handleSubmit = async e => {
		e.preventDefault();
		if (query.length > 0 && query !== prevQuery.current) {
			prevQuery.current = query;
			setIsLoading(true);

			const dietaryInfo = dietaryRestriction === "other" ? otherDietary : dietaryRestriction;
			const fullQuery = `${query}. Make it a recipe, be consice without losing info. List the recipe name in the first line. Dietary Restrictions: ${dietaryInfo}. Avoid ingredients: ${ingredientsToAvoid}.`;

			try {
				const res = await axios.post("http://localhost:3000/api/AIRecipes/ask", { query: fullQuery });
				setResponse(res.data.response);

				const parsed = parseRecipeResponse(res.data.response); // Parse the response
				setParsedRecipe(parsed); // Update parsedRecipe state

				setHistory(prevHistory => [...prevHistory, { recipeName: parsed.recipeName, query, response: res.data.response }]);
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
		<div className="container">
			{/* Left Section: Input Form */}
			<div className="left-section">
				<div className="hero">
					<a>
						<Chef height={100} width={100} />
					</a>
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

						{/* Flexbox container for dietary restrictions and ingredients */}
						<div className="form-row">
							{/* Dropdown for Dietary Restrictions */}
							<div className="dropdown">
								<label htmlFor="dietary">Dietary Restrictions:</label>
								<select id="dietary" value={dietaryRestriction} onChange={e => setDietaryRestriction(e.target.value)}>
									<option value="">Select...</option>
									<option value="non-veg">Non-Veg</option>
									<option value="halal">Halal</option>
									<option value="vegan">Vegan</option>
									<option value="vegetarian">Vegetarian</option>
									<option value="other">Other</option>
								</select>
								{dietaryRestriction === "other" && (
									<input
										type="text"
										placeholder="Please specify"
										value={otherDietary}
										onChange={e => setOtherDietary(e.target.value)}
										className="other-input"
									/>
								)}
							</div>

							{/* Ingredients to Avoid Input */}
							<div className="dropdown">
								<label htmlFor="ingredients">Ingredients to Avoid:</label>
								<input
									type="text"
									placeholder="separated by commas"
									value={ingredientsToAvoid}
									onChange={e => setIngredientsToAvoid(e.target.value)}
									className="ingredients-input"
								/>
							</div>
						</div>
						<br />

						<button className="submitbutton" type="submit" disabled={isLoading}>
							{isLoading ? "Loading..." : "Generate"}
						</button>
					</form>
				</div>
			</div>

			{/* Right Section: Output and History */}
			<div className="right-section">
				{parsedRecipe && (
					<div className="response">
						<h3>{parsedRecipe.recipeName ?? "Your Recipe"}</h3>

						{/* Ingredients Section */}
						{parsedRecipe.ingredients.length > 0 && (
							<div className="recipe-section">
								<h4>Required Ingredients:</h4>
								<ul>
									{parsedRecipe.ingredients.map((item, index) => {
										const isSection = item.match(/^<section(\d+)\/>$/);

										if (isSection) {
											return (
												<li key={index} style={{ margin: "0px" }}>
													<h4>{parsedRecipe.sections[isSection[1]]}</h4>
												</li>
											);
										}

										if (parsedRecipe.sections.length > 0) {
											return (
												<ul key={index} style={{ listStylePosition: "inside" }}>
													<li>{item}</li>
												</ul>
											);
										}
										return <li key={index}>{item}</li>;
									})}
								</ul>
							</div>
						)}

						{/* Instructions Section */}
						{parsedRecipe.instructions.length > 0 && (
							<div className="recipe-section">
								<h4>Instructions:</h4>
								<ul>
									{parsedRecipe.instructions.map((step, index) => (
										<li key={index}>{step}</li>
									))}
								</ul>
							</div>
						)}
					</div>
				)}

				{/* Interaction History */}
				{history.length > 0 && (
					<div className="history">
						<h3>Recipe History:</h3>
						<div className="history-slider">
							{history.map((entry, index) => (
								<div key={index} className="history-entry">
									<h4>{entry.recipeName ?? "Your Recipe"}</h4>
									<p>
										<strong>Query:</strong> {entry.query}
									</p>
									<p>
										<strong>Response:</strong> {entry.response}
									</p>
									<hr />
								</div>
							))}
						</div>
					</div>
				)}

				{!isLoading && !parsedRecipe && response && <p>{response}</p>}
			</div>
		</div>
	);
};

export default AIRecipes;
