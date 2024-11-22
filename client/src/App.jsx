import { useState } from "react";
import { filterRecipesByDiet } from "./filterRecipesByDiet.js"; // Path to your filtering function

// Example dietary restrictions list
const dietaryOptions = [
  "vegetarian",
  "vegan",
  "glutenFree",
  "dairyFree",
  "nutFree",
  "halal",
  "kosher",
];

// eslint-disable-next-line react/prop-types
function App({ recipes }) {
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  // Handle checkbox selection
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedRestrictions((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  // Filter recipes when Apply Filters is clicked
  const applyFilters = () => {
    let updatedRecipes = recipes;

    selectedRestrictions.forEach((restriction) => {
      updatedRecipes = filterRecipesByDiet(updatedRecipes, restriction);
    });

    setFilteredRecipes(updatedRecipes);
  };

  return (
    <div>
      <h1>Recipe Search</h1>
      <div>
        <h3>Select Dietary Restrictions:</h3>
        {dietaryOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              onChange={handleCheckboxChange}
            />
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </label>
        ))}
      </div>
      <button onClick={applyFilters}>Apply Filters</button>
      <h3>Filtered Recipes:</h3>
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.name}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
