import { BrowserRouter, Route, Routes } from "react-router-dom";

import SearchInterface from "./routes/SearchInterface";
import Recipes from "./routes/Recipes";
import Recipe from "./components/Recipe";
import AIRecipes from "./routes/AIRecipes";
import Profile from "./routes/Profile";
import Home from "./routes/Home";
import NavBar from "./Navbar";
import Login from "./routes/Login";
import Signup from "./routes/Signup";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				{/* maybe remove home and search interface for redundancy */}
				<Route path="/home" element={<Home />} />
				<Route path="/recipes" element={<Recipes />} />
				<Route path="/recipes/:recipeId" element={<Recipe />} />
				<Route path="/advanced" element={<SearchInterface />} />
				<Route path="/ai" element={<AIRecipes />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
