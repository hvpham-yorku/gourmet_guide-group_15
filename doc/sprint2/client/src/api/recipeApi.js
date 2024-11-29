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

// /*
//  * TODO: maybe implement pagination here instead of on backend
//  * (probably better to do it on server so each page can fetch a new page from backend)
//  */
// axios.interceptors.response.use(Promise.resolve, Promise.reject);

export const getRecipeQuery = async query => await recipeApi.request({ url: `/${query}` });
