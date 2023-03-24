import { Schema, model } from "mongoose";
import { MovieModel } from "../types/modelTypes";

const movieSchema = new Schema<MovieModel>({
    image: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Number, required: true },
});

const Movie = model<MovieModel>("Movie", movieSchema);
export default Movie;
