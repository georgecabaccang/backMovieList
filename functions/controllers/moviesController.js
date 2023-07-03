"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMovie = exports.getMovieDetails = exports.getMovies = exports.updateMovie = exports.removeMovie = exports.addMovie = void 0;
const moviesModel_1 = __importDefault(require("../models/moviesModel"));
// import { MovieModel } from "../types/modelTypes";
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieDetails = req.body.movieDetails;
        const newMovie = new moviesModel_1.default({
            image: movieDetails.image,
            title: movieDetails.title,
            description: movieDetails.description,
            rating: movieDetails.rating,
            date: movieDetails.date,
        });
        yield newMovie.save();
        return res.send(true);
    }
    catch (error) {
        if (error instanceof Error)
            res.send({ message: error.message });
    }
});
exports.addMovie = addMovie;
const removeMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield moviesModel_1.default.findOneAndDelete({ _id: req.params.movie_id });
        return res.send(true);
    }
    catch (error) {
        if (error instanceof Error)
            res.send("movie not found");
    }
});
exports.removeMovie = removeMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.body.updatedDetails.image;
    const title = req.body.updatedDetails.title;
    const description = req.body.updatedDetails.description;
    const rating = req.body.updatedDetails.rating;
    try {
        const movie = yield moviesModel_1.default.findById(req.body.updatedDetails._id);
        if (movie) {
            movie.image = image;
            movie.title = title;
            movie.description = description;
            movie.rating = rating;
            yield movie.save();
            return res.send(movie).status(200);
        }
        return res.send("movie not found").status(404);
    }
    catch (error) {
        if (error instanceof Error)
            res.send({ message: error.message });
    }
});
exports.updateMovie = updateMovie;
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield moviesModel_1.default.find();
        return res.send(movies);
    }
    catch (error) {
        if (error instanceof Error)
            res.send({ message: error.message });
    }
});
exports.getMovies = getMovies;
const getMovieDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie_id = req.params.movie_id;
    try {
        const movieDetails = yield moviesModel_1.default.findById(movie_id);
        if (movieDetails) {
            return res.send(movieDetails);
        }
        return res.send("movie not found").status(404);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.send("movie not found");
        }
    }
});
exports.getMovieDetails = getMovieDetails;
const searchMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.body.query;
        const movies = yield moviesModel_1.default.find({ title: { $regex: query, $options: "i" } });
        return res.send(movies).status(200);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.send({ message: error.message });
        }
    }
});
exports.searchMovie = searchMovie;
