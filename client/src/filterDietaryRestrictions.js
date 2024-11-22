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

const dietaryRestrictions = {
  vegetarian: [
    "beef",
    "pork",
    "chicken",
    "lamb",
    "fish",
    "shellfish",
    "bacon",
    "ham",
    "veal",
    "duck",
    "turkey",
    "sausage",
    "gelatin (non-vegetarian)",
  ],
  vegan: [
    "beef",
    "pork",
    "chicken",
    "lamb",
    "fish",
    "shellfish",
    "bacon",
    "ham",
    "veal",
    "duck",
    "turkey",
    "sausage",
    "gelatin",
    "milk",
    "cheese",
    "butter",
    "cream",
    "yogurt",
    "eggs",
    "honey",
    "whey",
    "casein",
  ],
  glutenFree: [
    "wheat",
    "barley",
    "rye",
    "bulgur",
    "couscous",
    "semolina",
    "spelt",
    "triticale",
    "malt",
    "farina",
    "graham flour",
    "durum",
  ],
  dairyFree: [
    "milk",
    "cheese",
    "butter",
    "cream",
    "yogurt",
    "ghee",
    "whey",
    "casein",
    "condensed milk",
    "evaporated milk",
    "custard",
    "cream cheese",
    "ice cream",
  ],
  nutFree: [
    "almonds",
    "walnuts",
    "cashews",
    "pistachios",
    "pecans",
    "hazelnuts",
    "macadamia nuts",
    "brazil nuts",
    "pine nuts",
    "peanuts", // Include as some nut-free diets avoid peanuts
    "nut oils (e.g., almond oil)",
  ],
  halal: [
    "pork",
    "bacon",
    "ham",
    "gelatin (non-halal)",
    "alcohol",
    "meat not slaughtered according to halal guidelines",
    "blood and blood products",
    "carnivorous animals",
  ],
  kosher: [
    "pork",
    "shellfish",
    "meat and dairy in the same dish",
    "meat not slaughtered according to kosher guidelines",
    "gelatin (non-kosher)",
    "cheeseburgers (mixing meat and cheese)",
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

function filterRecipesByDiet(recipes, restriction) {
  // Get the list of ingredients to avoid for the given restriction
  const restrictedIngredients = dietaryRestrictions[restriction] || [];

  return recipes.filter(
    (recipe) =>
      !recipe.ingredients.some((ingredient) =>
        restrictedIngredients.includes(ingredient.toLowerCase())
      )
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
