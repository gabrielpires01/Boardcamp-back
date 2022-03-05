import { Router } from "express";
import { GetCustomers, GetOneCustomer } from "../Controllers/CustomersController.js";

const customersRouter = Router()

customersRouter.get('/customers', GetCustomers)
customersRouter.get('/customers/:id', GetOneCustomer)

export default customersRouter;