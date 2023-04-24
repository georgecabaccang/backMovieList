import { load } from "ts-dotenv";

import express from "express";
import ServerlessHttp from "serverless-http";
import mongoose from "mongoose";
import cors from "cors";

import moviesRoutes from "./routes/moviesRoutes";

const env = load({
    MONGO_DB: String,
    PORT: Number,
});

const app = express();

interface errorMDB {
    message: string;
}

mongoose.connect(env.MONGO_DB);
const db = mongoose.connection;
db.on("error", (error: errorMDB) => console.log(error.message));
db.once("open", () => console.log("Connected to DB."));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors({origin: "https://movies-front-project.netlify.app"}));


app.use("/movies", moviesRoutes);

app.listen(env.PORT, () => console.log(`Listeninig to Port ${env.PORT}`));

module.exports.hanlder = ServerlessHttp(app);
export = {};
