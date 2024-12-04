import { connect } from "mongoose";
import { config } from "dotenv";

import express from "express";
import cors from "cors";

import recipeRouter from "./routes/api/recipes.js";

console.log(process.cwd());

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipeRouter);

// connect(process.env.MONGODB_URI)
// 	.then(() => console.log("Connected to MongoDB"))
// 	.catch(err => console.error("Connection to MongoDB errored with:", err));

app.listen(process.env.SERVER_PORT, () => console.log(`Server sucessfully running on http://localhost:${process.env.SERVER_PORT}`));
