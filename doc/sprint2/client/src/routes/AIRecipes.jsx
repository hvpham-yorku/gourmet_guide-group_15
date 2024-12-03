import React, { useRef, useState } from "react";
import axios from "axios";
import "@/styles/AIRecipes.css";

const parseRecipeResponse = (responseText) => {
    const parsedRecipe = {
        ingredients: [],
        instructions: [],
    };

    // Split response into lines and categorize them
    const lines = responseText.split("\n").filter(line => line.trim() !== "");

    let currentSection = ""; // Track whether we're in "Ingredients" or "Instructions"
    lines.forEach((line) => {
        if (line.toLowerCase().includes("ingredients")) {
            currentSection = "ingredients";
        } else if (line.toLowerCase().includes("instructions")) {
            currentSection = "instructions";
        } else if (currentSection === "ingredients") {
            parsedRecipe.ingredients.push(line.trim());
        } else if (currentSection === "instructions") {
            parsedRecipe.instructions.push(line.trim());
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

	const prevQuery = useRef(query);

	const maxCharacters = 100;

	const handleSubmit = async e => {
		e.preventDefault();
		if (query.length > 0 && query !== prevQuery.current) {
			prevQuery.current = query;
			setIsLoading(true);

			const dietaryInfo =
        			dietaryRestriction === "other" ? otherDietary : dietaryRestriction;

   				 // Add everything to the query
    			const fullQuery = `${query}. Make it a recipe, be consice without losing info. Dietary Restrictions: ${dietaryInfo}. Avoid ingredients: ${ingredientsToAvoid}.`;


			try {

			
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

            {/* Dropdown for Dietary Restrictions */}
            <div className="dropdown">
                <label htmlFor="dietary">Dietary Restrictions:</label>
                <select
                    id="dietary"
                    value={dietaryRestriction}
                    onChange={(e) => setDietaryRestriction(e.target.value)}
                >
                    <option value="">Select...</option>
                    <option value="non-veg">Non-Veg</option>
                    <option value="halal">Halal</option>
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="other">Other</option>
                </select>

                {/* Show input box if "Other" is selected */}
                {dietaryRestriction === "other" && (
                    <input
                        type="text"
                        placeholder="Please specify"
                        value={otherDietary}
                        onChange={(e) => setOtherDietary(e.target.value)}
                        className="other-input"
                    />
                )}
            </div>
            <br />

            {/* Dropdown for Ingredients to Avoid */}
            <div className="dropdown">
                <label htmlFor="ingredients">Ingredients to Avoid:</label>
                <input
                    type="text"
                    placeholder="Enter ingredients to avoid, separated by commas"
                    value={ingredientsToAvoid}
                    onChange={(e) => setIngredientsToAvoid(e.target.value)}
                    className="ingredients-input"
                />
            </div>
            <br />

            <button className="submitbutton" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Enter"}
            </button>
       		 </form>
    		</div>
			{parsedRecipe && (
    <div className="response">
        <h3>Your Recipe:</h3>
        
        {/* Ingredients Section */}
        {parsedRecipe.ingredients.length > 0 && (
            <div className="recipe-section">
                <h4>Required Ingredients:</h4>
                <ul>
                    {parsedRecipe.ingredients.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
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

			{!isLoading && !parsedRecipe && response && <p>{response}</p>}
		</div>
	);
};

export default AIRecipes;
