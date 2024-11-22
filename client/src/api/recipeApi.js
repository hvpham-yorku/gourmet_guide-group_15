import axios from "axios";

// eslint-disable-next-line no-unused-vars
const recipeApi = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}/recipes`,
	headers: {
		"Content-Type": "application/json",
	},
});

export const getAllRecipes = async () => {
	// try {
	// 	const res = await recipeApi.request();
	// } catch (err) {}
};
