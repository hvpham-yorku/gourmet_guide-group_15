import { Route, Routes } from "react-router-dom";

import SearchInterface from "./routes/SearchInterface";
import RecipesDatabase from "./routes/RecipesDatabase";
import AIRecipes from "./routes/AIRecipes";
import Profile from "./routes/Profile";
import Home from "./routes/Home";
import NavBar from "./Navbar";
import Login from "./routes/Login";
import Signup from "./routes/Signup";

function App() {
	return (
		<>
			<NavBar />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					{/* maybe remove home and search interface for redundancy */}
					<Route path="/home" element={<Home />} />
					<Route path="/advanced" element={<SearchInterface />} />
					<Route path="/database" element={<RecipesDatabase />} />
					<Route path="/ai" element={<AIRecipes />} />
					<Route path="/cart" element={<Profile />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
