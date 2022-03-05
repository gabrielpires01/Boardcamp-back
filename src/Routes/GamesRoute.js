import { Router } from "express";
import { GetGames, PostGames } from "../Controllers/GamesController.js";
import ValidateSchema from "../Middlewares/SchemaValidation.js";
import gamesValidation from "../Schemas/GamesSchema.js";

const gamesRoute = Router();

gamesRoute.get('/games', GetGames);
gamesRoute.post('/games', ValidateSchema(gamesValidation), PostGames)

export default gamesRoute;