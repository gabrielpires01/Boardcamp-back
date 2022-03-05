import { Router } from "express";
import { GetGames } from "../Controllers/GamesController.js";

const gamesRoute = Router();

gamesRoute.get('/games', GetGames);

export default gamesRoute;