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
        res.json(movies);
    } catch (error) {
        if (error instanceof Error) res.send({ message: error.message });
    }
};

export const getMovieDetails = async (req: Request, res: Response) => {
    const movie_id = req.params.movie_id;
    try {
        const movieDetails = await Movie.findById(movie_id);
        if (movieDetails) {
            return res.send(movieDetails);
        }
        return res.send("movie not found").status(404);
    } catch (error) {
        if (error instanceof Error) {
            return res.send({ message: error.message });
        }
    }
};

export const searchMovie = async (req: Request, res: Response) => {
    try {
        const query = req.body.query;
        const movies = await Movie.find({ title: { $regex: query, $options: "i" } });
        return res.send(movies).status(200);
    } catch (error) {
        if (error instanceof Error) {
            return res.send({ message: error.message });
        }
    }
};
