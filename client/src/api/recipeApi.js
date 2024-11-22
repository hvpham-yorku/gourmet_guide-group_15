import axios from "axios";

const recipeApi = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}/recipes`,
	headers: {
		"Content-Type": "application/json",
	},
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
