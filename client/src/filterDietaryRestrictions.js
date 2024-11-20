const apiResponse = {
  meals: [
    {
      idMeal: "52978",
      strMeal: "Kumpir",
      strCategory: "Side",
      strArea: "Turkish",
      strInstructions: "If you order kumpir in Turkey, ...",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg",
      strTags: "SideDish",
      strYoutube: "https://www.youtube.com/watch?v=IEDEtZ4UVtI",
      strIngredient1: "Potatoes",
      strIngredient2: "Butter",
      strIngredient3: "Cheese",
      strIngredient4: "Onion",
      strIngredient5: "Red Pepper",
      strIngredient6: "Red Chilli Flakes",
      strIngredient7: "",
      strMeasure1: "2 large",
      strMeasure2: "2 tbs",
      strMeasure3: "150g",
      strMeasure4: "1 large",
      strMeasure5: "1 large",
      strMeasure6: "Pinch",
    },
  ],
};

// Transforming the response for easier filtering
const recipes = apiResponse.meals.map((meal) => ({
  id: meal.idMeal,
  name: meal.strMeal,
  category: meal.strCategory,
  tags: meal.strTags ? meal.strTags.split(",") : [],
  ingredients: Object.keys(meal)
    .filter((key) => key.startsWith("strIngredient") && meal[key])
    .map((key) => meal[key].toLowerCase()),
}));

function filterRecipesByDiet(recipes, dietaryRestrictions) {
  return recipes.filter((recipe) =>
    dietaryRestrictions.every((restriction) => {
      // Define dietary rules
      if (restriction === "vegetarian") {
        const nonVegIngredients = ["chicken", "beef", "pork", "fish", "salami"];
        return !recipe.ingredients.some((ingredient) =>
          nonVegIngredients.includes(ingredient)
        );
      } else if (restriction === "dairy-free") {
        const dairyIngredients = [
          "cheese",
          "butter",
          "milk",
          "cream",
          "yogurt",
        ];
        return !recipe.ingredients.some((ingredient) =>
          dairyIngredients.includes(ingredient)
        );
      }
      return true; // Default to including recipe if no specific rule
    })
  );
}

document.getElementById("apply-filters").addEventListener("click", () => {
  const selectedRestrictions = Array.from(
    document.querySelectorAll("#dietary-filters input:checked")
  ).map((input) => input.value);

  const filteredRecipes = filterRecipesByDiet(recipes, selectedRestrictions);
  displayFilteredRecipes(filteredRecipes);
});

function displayFilteredRecipes(filteredRecipes) {
  const resultsDiv = document.getElementById("filtered-recipes");
  resultsDiv.innerHTML = ""; // Clear previous results

  if (filteredRecipes.length === 0) {
    resultsDiv.innerHTML = "<p>No recipes match your criteria.</p>";
    return;
  }

  filteredRecipes.forEach((recipe) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.innerHTML = `<h3>${recipe.name}</h3>`;
    resultsDiv.appendChild(recipeDiv);
  });
}
