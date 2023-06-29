"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const ts_dotenv_1 = require("ts-dotenv");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const moviesRoutes = require("./routes/moviesRoutes");
const env = (0, ts_dotenv_1.load)({
    MONGO_DB: String,
    PORT: Number,
});
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.MONGO_DB);
const db = mongoose_1.default.connection;
db.on("error", (error) => console.log(error.message));
db.once("open", () => console.log("Connected to DB."));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb" }));
app.use((0, cors_1.default)({ credentials: true, origin: "https://front-movie-list.vercel.app" }));
app.use("/movies", moviesRoutes);
app.get("/", (req, res) => {
    return res.send({ message: "Okay" });
});
app.listen(8001, () => console.log(`Port ${8001}`));
exports.default = app;
