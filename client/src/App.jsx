import RecipeSearchEngine from "@/components/RecipeSearchEngine";
import RecipesDatabase from "./components/RecipesDataBase";
import AIRecipes from "./components/AIRecipes";
import Profile from "./components/Profile";
import { Route,Routes } from 'react-router-dom';
import NavBar from "@/Navbar/Navbar";
import "./App.css";

function App() {
	return (
		<>
		<NavBar/>
		<div>
    <Routes>        
      <Route path="/search"  element={<RecipeSearchEngine/>} />
	  <Route path="/database"  element={<RecipesDatabase/>} />
	  <Route path="/AI"  element={<AIRecipes/>} />
	  <Route path="/cart"  element={<Profile/>} />
    </Routes>
    </div>
		</>
	);
}

export default App;
