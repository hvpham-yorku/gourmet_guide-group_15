import axios from "axios";

const recipeApi = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/recipes`,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 1000,
});

// export const getAllRecipes = async () => {
// 	try {
// 		const res = await recipeApi.request();
// 	} catch (err) {}
// };

// axios.interceptors.response.use(Promise.resolve, Promise.reject);

export const getRecipeQuery = async (query, page = 1, limit = 3) => await recipeApi.request({ params: { query, page, limit } });
