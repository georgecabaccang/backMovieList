require("dotenv").config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const moviesRoutes = require("./routes/moviesRoutes");

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
app.use(cors({ origin: "https://front-movie-list.vercel.app" }));
// app.use(cors({ origin: "http://localhost:5173" }));

app.use("/movies", moviesRoutes);

app.listen(8001, () => console.log(`Port ${8001}`));


export default app;
  