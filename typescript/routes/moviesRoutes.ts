import express from "express";
const moviesRoutes = express.Router();

import {
    addMovie,
    removeMovie,
    updateMovie,
    getMovies,
} from "../controllers/moviesController";

moviesRoutes.get("/getMovies", getMovies);

moviesRoutes.post("/addMovie", addMovie);

moviesRoutes.delete("/removeMovie", removeMovie);

moviesRoutes.patch("/updateMovie", updateMovie);

module.exports = moviesRoutes;
