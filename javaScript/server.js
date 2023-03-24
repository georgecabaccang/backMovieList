"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const PORT = 8000;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const moviesRoutes_1 = __importDefault(require("./routes/moviesRoutes"));
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb+srv://miniprojects:miniprojects@projects.wpbsykb.mongodb.net/movies?retryWrites=true&w=majority");
const db = mongoose_1.default.connection;
db.on("error", (error) => console.log(error.message));
db.once("open", () => console.log("Connected to DB."));
app.use(express_1.default.json());
app.use("/movies", moviesRoutes_1.default);
app.listen(PORT, () => console.log(`Listeninig to Port ${PORT}`));
module.exports = {};
