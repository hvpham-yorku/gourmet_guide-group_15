import { Route, Routes } from "react-router-dom";

import SearchInterface from "./routes/SearchInterface";
import RecipesDatabase from "./components/RecipesDataBase";
import AIRecipes from "./routes/AIRecipes";
import Profile from "./routes/Profile";
import HomePage from "./routes/HomePage";
import NavBar from "./Navbar";

import "./App.css";

function App() {
	return (
		<>
			<NavBar />
			<div>
				<Routes>
					<Route path="/search" element={<SearchInterface />} />
					<Route path="/database" element={<RecipesDatabase />} />
					<Route path="/AI" element={<AIRecipes />} />
					<Route path="/cart" element={<Profile />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/Home" element={<HomePage />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
