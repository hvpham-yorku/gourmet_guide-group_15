import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const sampleRecipes = [
  {
    name: "Grilled Chicken",
    ingredients: ["chicken", "salt", "pepper"],
  },
  {
    name: "Vegan Salad",
    ingredients: ["lettuce", "tomato", "cucumber"],
  },
  {
    name: "Cheese Pizza",
    ingredients: ["flour", "cheese", "tomato sauce"],
  },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App recipes={sampleRecipes} />
  </StrictMode>
);
