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

export function filterRecipesByDiet(recipes, restriction) {
  // Get the list of ingredients to avoid for the given restriction
  const restrictedIngredients = dietaryRestrictions[restriction] || [];

  return recipes.filter(
    (recipe) =>
      !recipe.ingredients.some((ingredient) =>
        restrictedIngredients.includes(ingredient.toLowerCase())
      )
  );
}
