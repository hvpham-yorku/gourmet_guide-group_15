import axios from "axios";
import { Router } from "express";

const recipeApi = axios.create({ baseURL: "https://www.themealdb.com/api/json/v1/1" });

const router = Router();

router.use("/", (req, res, next) => {
	res.paginate = data => {
		// TODO: implement function that paginates json
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

	const response = res.paginate(recipeResponse.data);
	res.json(response);
});

router.route("/:query").get(async (req, res) => {
	const recipeResponse = await recipeApi.request({
		url: "/search.php",
		params: {
			s: req.params.query,
		},
	});

	const response = res.paginate(recipeResponse.data);
	res.json(response);
});

export default router;
