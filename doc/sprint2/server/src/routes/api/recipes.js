import axios from "axios";
import { Router } from "express";

const recipeApi = axios.create({ baseURL: "https://www.themealdb.com/api/json/v1/1" });

const router = Router();

router.use("/", (req, res, next) => {
	res.paginate = data => {
		const displayLimit = parseInt(req.query.limit) || 3;
		if (data.meals?.length > displayLimit) {
			const page = parseInt(req.query.page) || 1;

			const start = (page - 1) * displayLimit;
			const end = page * displayLimit;

			data.meals = data.meals.slice(start, end);
			data.paginationData = {
				currentPage: page,
				totalPages: Math.ceil(data.meals.length),
			};
		}
		/*
		 * {
		 *		meals: [...],
		 *		paginationData: {
		 *			currentPage,
		 *			totalPages
		 *		}
		 * }
		 */
		return data;
	};

	next();
});

router.route("/").get(async (req, res) => {
	const recipeResponse = await recipeApi.request({
		url: "/search.php",
		params: {
			s: "",
		},
	});

	const paginatedData = res.paginate(recipeResponse.data);
	res.status(200).json(paginatedData);
});

router.route("/:query").get(async (req, res) => {
	const recipeResponse = await recipeApi.request({
		url: "/search.php",
		params: {
			s: req.params.query,
		},
	});

	const paginatedData = res.paginate(recipeResponse.data);
	res.status(200).json(paginatedData);
});

export default router;
