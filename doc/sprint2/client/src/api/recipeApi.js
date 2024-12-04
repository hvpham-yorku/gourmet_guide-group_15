import axios from "axios";

const recipeApi = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/recipes`,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 1000,
});

// axios.interceptors.response.use(Promise.resolve, Promise.reject);

export const getAllRecipes = async () => await recipeApi.request({ params: { query: "" } });

export const getRecipeQuery = async (query, page = 1, limit = 3) => await recipeApi.request({ params: { query, page, limit } });

export const getRecipeFromId = async recipeId =>
	await recipeApi.request({ baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/recipes/${recipeId}` });
