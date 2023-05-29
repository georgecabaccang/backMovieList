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
exports.getMovies = exports.updateMovie = exports.removeMovie = exports.addMovie = void 0;
const moviesModel_1 = __importDefault(require("../models/moviesModel"));
// import { MovieModel } from "../types/modelTypes";
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMovie = new moviesModel_1.default({
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            rating: req.body.rating,
            date: req.body.date,
        });
        yield newMovie.save();
        res.send(true);
    }
    catch (error) {
        if (error instanceof Error)
            res.send({ message: error.message });
    }
});
exports.addMovie = addMovie;
const removeMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield moviesModel_1.default.findOneAndDelete({ _id: req.body._id });
        res.send(true);
    }
    catch (error) {
        if (error instanceof Error)
            res.send({ message: error.message });
    }
});
exports.removeMovie = removeMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield moviesModel_1.default.findByIdAndUpdate(req.body._id, {
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            rating: req.body.rating,
        });
        const movie = yield moviesModel_1.default.findById(req.body._id);
        res.send(true);
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
        res.json(movies);
    }
    catch (error) {
        if (error instanceof Error)
            res.send({ message: error.message });
    }
});
exports.getMovies = getMovies;
