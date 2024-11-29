import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [recipes, setRecipes] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	});

	useEffect(() => {
		fetchRecipes();
	}, []);

	const fetchRecipes = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/recipes");
			setRecipes(response.data);
		} catch (err) {
			console.error("Error fetching recipes:", err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:5000/api/recipes", formData);
			setFormData({ name: "", description: "" });
			fetchRecipes();
			alert("Recipe added successfully!");
		} catch (err) {
			alert("Error adding recipe");
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div style={{ padding: "20px" }}>
			<h1>Gourmet Guide</h1>

			<form onSubmit={handleSubmit}>
				<div>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Recipe Name"
						style={{ margin: "5px", padding: "5px" }}
						required
					/>
				</div>
				<div>
					<input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Recipe Description"
						style={{ margin: "5px", padding: "5px" }}
						required
					/>
				</div>
				<button type="submit" style={{ margin: "5px", padding: "5px" }}>
					Add Recipe
				</button>
			</form>

			<h2>Recipes:</h2>
			{recipes.map((recipe) => (
				<div
					key={recipe._id}
					style={{ margin: "10px", padding: "10px", border: "1px solid #ccc" }}
				>
					<h3>{recipe.name}</h3>
					<p>{recipe.description}</p>
				</div>
			))}
		</div>
	);
}

export default App;
