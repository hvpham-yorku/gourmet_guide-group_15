import RecipeSearchEngine from "@/components/RecipeSearchEngine";

import "@/styles/Home.css";

const Home = () => {
	return (
		<>
			<main>
				<h1>Gourmet Guide</h1>
				<RecipeSearchEngine />
				<section className="recommendations">
					<h2>What we think you might like...</h2>
					<div className="recipe-list">
						{/* Example recipe cards */}
						<div className="recipe-card">Recipe 1</div>
						<div className="recipe-card">Recipe 2</div>
						<div className="recipe-card">Recipe 3</div>
						<button className="scroll-button left">&lt;</button>
						<button className="scroll-button right">&gt;</button>
					</div>
				</section>
			</main>
			<footer>
				<p>&copy; 2024 Gourmet Guide. All rights reserved.</p>
			</footer>
		</>
	);
};

export default Home;
