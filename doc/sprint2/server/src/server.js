import { connect } from "mongoose";
import { config } from "dotenv";

import express from "express";
import cors from "cors";

import recipeRouter from "./routes/api/recipes.js";

import cookieParser from "cookie-parser";
import authRoute from "./routes/AuthRoute.js";

console.log(process.cwd());

config();

const app = express();

app.use(
	cors({
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(express.json());

app.use(cookieParser());
app.use("/", authRoute);

app.use("/api/recipes", recipeRouter);

connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.error("Connection to MongoDB errored with:", err));

app.listen(process.env.SERVER_PORT, () => console.log(`Server sucessfully running on http://localhost:${process.env.SERVER_PORT}`));
