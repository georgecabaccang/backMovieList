"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    image: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Number, required: true },
});
const Movie = (0, mongoose_1.model)("Movie", movieSchema);
exports.default = Movie;
