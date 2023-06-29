import express from "express";
const moviesRoutes = express.Router();

import {
    addMovie,
    removeMovie,
    updateMovie,
    getMovies,
    getMovieDetails,
} from "../controllers/moviesController";

moviesRoutes.get("/getMovies", getMovies);

moviesRoutes.post("/addMovie", addMovie);

moviesRoutes.delete("/removeMovie", removeMovie);

moviesRoutes.patch("/updateMovie", updateMovie);

moviesRoutes.get("/getMovieDetails/:movie_id", getMovieDetails);

module.exports = moviesRoutes;
