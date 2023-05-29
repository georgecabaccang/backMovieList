import { load } from "ts-dotenv";

import express from "express";
const serverless = require("serverless-http");
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

mongoose.connect(
    "mongodb+srv://miniprojects:thenewpassword@projects.wpbsykb.mongodb.net/movies?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", (error: errorMDB) => console.log(error.message));
db.once("open", () => console.log("Connected to DB."));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

app.use("/.netlify/functions/server", moviesRoutes);

app.listen(8001, () => console.log(`Listeninig to Port ${8001}`));
module.exports.handler = serverless(app);

export default app;
