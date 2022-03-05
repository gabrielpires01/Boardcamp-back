import { Router } from "express";
import { GetCategories, PostCategories } from "../Controllers/CategoriesController.js";
import ValidateSchema from "../Middlewares/SchemaValidation.js";
import categoryValidation from "../Schemas/CategoriesSchema.js";

const categoryRouter = Router();

categoryRouter.get('/categories', GetCategories);
categoryRouter.post('/categories', ValidateSchema(categoryValidation), PostCategories);

export default categoryRouter;