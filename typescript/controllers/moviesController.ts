import Movie from "../models/moviesModel";
import { Request, Response } from "express";
// import { MovieModel } from "../types/modelTypes";

export const addMovie = async (req: Request, res: Response) => {
    try {
        const movieDetails = req.body.movieDetails;
        const newMovie = new Movie({
            image: movieDetails.image,
            title: movieDetails.title,
            description: movieDetails.description,
            rating: movieDetails.rating,
            date: movieDetails.date,
        });
        await newMovie.save();
        return res.send(true);
    } catch (error) {
        if (error instanceof Error) res.send({ message: error.message });
    }
};

export const removeMovie = async (req: Request, res: Response) => {
    try {
        await Movie.findOneAndDelete({ _id: req.params.movie_id });
        return res.send(true);
    } catch (error) {
        if (error instanceof Error) res.send("movie not found");
    }
};

export const updateMovie = async (req: Request, res: Response) => {
    const image = req.body.updatedDetails.image;
    const title = req.body.updatedDetails.title;
    const description = req.body.updatedDetails.description;
    const rating = req.body.updatedDetails.rating;

    try {
        const movie = await Movie.findById(req.body.updatedDetails._id);
        if (movie) {
            movie.image = image;
            movie.title = title;
            movie.description = description;
            movie.rating = rating;

            await movie.save();
            return res.send(movie).status(200);
        }
        return res.send("movie not found").status(404);
    } catch (error) {
        if (error instanceof Error) res.send({ message: error.message });
    }
};

export const getMovies = async (req: Request, res: Response) => {
    try {
        const movies = await Movie.find();
        return res.send(movies);
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
            return res.send("movie not found");
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
