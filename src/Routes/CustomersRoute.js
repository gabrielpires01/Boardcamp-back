import { Router } from "express";
import { GetCustomers } from "../Controllers/CustomersController.js";

const customersRouter = Router()

customersRouter.get('/customers', GetCustomers)

export default customersRouter;