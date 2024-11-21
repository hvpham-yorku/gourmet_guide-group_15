import RecipeSearchEngine from "@/components/RecipeSearchEngine";
import SearchInterface from "./components/SearchInterface";
import RecipesDatabase from "./components/RecipesDataBase";
import AIRecipes from "./components/AIRecipes";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import { Route,Routes } from 'react-router-dom';
import NavBar from "@/Navbar/Navbar";
import "./App.css";

function App() {
	return (
		<>
		<NavBar/>
		<div>
    <Routes>        
      <Route path="/search"  element={<SearchInterface/>} />
	  <Route path="/database"  element={<RecipesDatabase/>} />
	  <Route path="/AI"  element={<AIRecipes/>} />
	  <Route path="/cart"  element={<Profile/>} />
	  <Route path="/profile"  element={<Profile/>} />
	  <Route path="/Home"  element={<HomePage/>} />
    </Routes>
    </div>
		</>
	);
}

export default App;
