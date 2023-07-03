"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesRoutes = express_1.default.Router();
const moviesController_1 = require("../controllers/moviesController");
moviesRoutes.get("/getMovies", moviesController_1.getMovies);
moviesRoutes.post("/addMovie", moviesController_1.addMovie);
moviesRoutes.delete("/removeMovie/:movie_id", moviesController_1.removeMovie);
moviesRoutes.patch("/updateMovie", moviesController_1.updateMovie);
moviesRoutes.get("/getMovieDetails/:movie_id", moviesController_1.getMovieDetails);
module.exports = moviesRoutes;
