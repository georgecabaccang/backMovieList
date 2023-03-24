import Movie from "../models/moviesModel";
import { Request, Response } from "express";
// import { MovieModel } from "../types/modelTypes";

export const addMovie = async (req: Request, res: Response) => {
    try {
        const newMovie = new Movie({
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            rating: req.body.rating,
            date: req.body.date,
        });
        await newMovie.save();
        res.send(true);
    } catch (error) {
        if (error instanceof Error) res.send({ message: error.message });
    }
};

export const removeMovie = async (req: Request, res: Response) => {
    try {
        await Movie.findOneAndDelete({ _id: req.body._id });
        res.send(true);
    } catch (error) {
        if (error instanceof Error) res.send({ message: error.message });
    }
};

export const updateMovie = async (req: Request, res: Response) => {
    try {
        await Movie.findByIdAndUpdate(req.body._id, {
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            rating: req.body.rating,
        });

        const movie = await Movie.findById(req.body._id);
        res.send(true);
    } catch (error) {
        if (error instanceof Error) res.send({ message: error.message });
    }
};

export const getMovies = async (req: Request, res: Response) => {
    try {
        const movies = await Movie.find();
        res.send(movies);
    } catch (error) {
        if (error instanceof Error) res.send({ message: error.message });
    }
};
