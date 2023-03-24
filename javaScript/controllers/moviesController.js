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
exports.addMovie = void 0;
const moviesModel_1 = __importDefault(require("../models/moviesModel"));
// import { MovieModel } from "../types/modelTypes";
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMovie = new moviesModel_1.default({
            title: req.body.title,
            description: req.body.description,
            rating: req.body.rating,
        });
        yield newMovie.save();
        console.log(newMovie);
    }
    catch (error) {
        if (error instanceof Error)
            res.send({ message: error.message });
    }
});
exports.addMovie = addMovie;
