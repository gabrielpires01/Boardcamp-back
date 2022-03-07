import { Router } from "express";
import categoryRouter from "./CategoriesRoute.js";
import customersRouter from "./CustomersRoute.js";
import gamesRoute from "./GamesRoute.js";
import rentalsRoute from "./RentalsRoute.js";

const router = Router();

router.use(categoryRouter);
router.use(gamesRoute)
router.use(customersRouter)
router.use(rentalsRoute)

export default router;