import { Router } from "express";
import categoryRouter from "./CategoriesRoute.js";

const router = Router();

router.use(categoryRouter);

export default router;