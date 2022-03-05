import { Router } from "express";
import categoryRouter from "./CategoriesRoute.js";
import gamesRoute from "./GamesRoute.js";

const router = Router();

router.use(categoryRouter);
router.use(gamesRoute)

export default router;