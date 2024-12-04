import { useRef, useState } from "react";
import axios from "axios";
import "@/styles/AIRecipes.css";

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
				// const res = {
				// 	data: {
				// 		response:
				// 			"Recipe Name: Korean Fried Chicken with Veggie Stir Fry\n\nIngredients:\n\nFor Korean Fried Chicken:\n\n1. 1Kg Halal Chicken\n2. 1 1/2 cup Potato Starch\n3. 1 tsp Salt\n4. 1 tsp Black Pepper\n5. Vegetable Oil for Frying\n\nFor the Sauce:\n\n1. 2 tbsp Korean Chilli Paste (Gochujang)\n2. 1 tbsp Soy Sauce\n3. 3 tbsp Honey\n4. 2 Garlic Cloves (minced)\n5. 1 tbsp Sesame Oil\n6. Sesame Seeds (optional)\n\nFor Veggie Stir Fry:\n\n1. 2 cups Mixed Vegetables (carrots, bell peppers, onions, etc.)\n2. 2 tbsp Vegetable Oil\n3. 1 tbsp Soy Sauce\n4. Salt-to-taste\n5. Black Pepper-to-taste\n\nInstructions:\n\n1. Clean the chicken and pat dry.\n\n2. Season chicken with salt and black pepper, then coat with potato starch.\n\n3. Heat the vegetable oil over medium-high in a deep pot. Fry the chicken until golden brown. Remove and drain on paper towels.\n\n4. For the sauce, combine Korean chilli paste, soy sauce, honey, minced garlic, and sesame oil in a bowl. Stir until well mixed.\n\n5. In a separate pan, heat 2 tablespoons of oil. Add the mixed vegetables and stir fry for about 5 minutes or until tender. Season with soy sauce, salt, and pepper.\n\n6. Toss fried chicken in the sauce until well coated.\n\n7. Garnish with sesame seeds (if using) and serve the Korean fried chicken with the veggie stir fry.\n\nEnjoy your Halal Korean Fried Chicken with Veggie Stir Fry.",
				// 	},
				// };
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
		<div>
			<div className="hero">
				<h1 className="title">Gourmet Assistant</h1>
				<p className="description">Let our AI create the perfect recipe just for you!</p>
				<form className="prompt" onSubmit={handleSubmit}>
					<textarea
						placeholder="Enter your recipe request (max 100 characters)"
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
								placeholder="Separate by commas"
								value={ingredientsToAvoid}
								onChange={e => setIngredientsToAvoid(e.target.value)}
								className="ingredients-input"
							/>
						</div>
					</div>
					<br />

					<button className="submitbutton" type="submit" disabled={isLoading}>
						{isLoading ? "Loading..." : "Enter"}
					</button>
				</form>
			</div>
			{parsedRecipe && (
				<div className="response">
					<h3>{parsedRecipe.recipeName}</h3>
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
							<ol>
								{parsedRecipe.instructions.map((step, index) => (
									<li key={index}>{step}</li>
								))}
							</ol>
						</div>
					)}
				</div>
			)}

			{/* Display Interaction History */}
			{history.length > 0 && (
				<div className="history">
					<h3>Recipe History:</h3>
					{history.map((entry, index) => (
						<div key={index} className="history-entry">
							<h4>{entry.recipeName}</h4>
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
			)}

			{!isLoading && !parsedRecipe && response && <p>{response}</p>}
		</div>
	);
};

export default AIRecipes;
