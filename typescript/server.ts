require("dotenv").config();
import { load } from "ts-dotenv";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const moviesRoutes = require("./routes/moviesRoutes");

const env = load({
    MONGO_DB: String,
    PORT: Number,
});

const app = express();

interface errorMDB {
    message: string;
}

mongoose.connect(process.env.MONGO_DB as string);
const db = mongoose.connection;
db.on("error", (error: errorMDB) => console.log(error.message));
db.once("open", () => console.log("Connected to DB."));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors({ credentials: false, origin: "https://front-movie-list.vercel.app/movies" }));

app.use("/movies", moviesRoutes);

app.listen(8001, () => console.log(`Listeninig to Port ${8001}`));

export default app;
