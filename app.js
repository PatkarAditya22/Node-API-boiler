import express from "express";
import mongoose from "mongoose";
import fetch from "./node_modules/node-fetch/src/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {} from "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static(dirname + "/public"));
app.use(express.static(dirname + "/images"));

let url, news;

app.get("/", async (req, res) => {
	url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}`;

	const response = await fetch(url);
	news = await response.json();
	console.log(news);

	res.send(news);
});

app.get("/search", async (req, res) => {
	const query = req.query.search;
	url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.API_KEY}`;

	const response = await fetch(url);
	news = await response.json();
	console.log(news);

	res.send(news);
});

app.get("/sources", async (req, res) => {
	url = `https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.API_KEY}`;

	const response = await fetch(url);
	news = await response.json();
	console.log(news);

	res.send(news);
});

app.post("/register", (req, res) => {
	const { name, email, fees } = req.body;
	console.log(name, email, fees);
	res.send(`successfully registered ${name}!`);
});

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
