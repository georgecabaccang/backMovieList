"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const moviesController = require("../controllers/moviesController");
const moviesController_1 = require("../controllers/moviesController");
const moviesRoutes = express_1.default.Router();
moviesRoutes.post("/addMovie", moviesController_1.addMovie);
exports.default = moviesRoutes;
