import { Router } from "express";
import categoryRouter from "./CategoriesRoute.js";
import customersRouter from "./CustomersRoute.js";
import gamesRoute from "./GamesRoute.js";

const router = Router();

router.use(categoryRouter);
router.use(gamesRoute)
router.use(customersRouter)

export default router;