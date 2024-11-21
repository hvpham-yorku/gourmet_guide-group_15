import RecipeSearchEngine from "@/components/RecipeSearchEngine";
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
    </Routes>
    </div>
	

		</>
	);
}

export default App;
