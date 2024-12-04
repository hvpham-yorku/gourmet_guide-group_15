import { BrowserRouter, Route, Routes } from "react-router-dom";

import SearchInterface from "./routes/SearchInterface";
import RecipesDatabase from "./routes/RecipesDatabase";
import Recipe from "./components/Recipe";
import AIRecipes from "./routes/AIRecipes";
import Profile from "./routes/Profile";
import Home from "./routes/Home";
import NavBar from "./Navbar";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				{/* maybe remove home and search interface for redundancy */}
				<Route path="/home" element={<Home />} />
				<Route path="/recipes" element={<RecipesDatabase />} />
				<Route path="/recipes/:recipeId" element={<Recipe />} />
				<Route path="/advanced" element={<SearchInterface />} />
				<Route path="/ai" element={<AIRecipes />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
