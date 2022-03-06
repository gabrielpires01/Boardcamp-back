import { Router } from "express";
import { GetCustomers, GetOneCustomer, PostCustomers, UpdateCustomer } from "../Controllers/CustomersController.js";
import ValidateSchema from "../Middlewares/SchemaValidation.js";
import customersValidation from "../Schemas/CustomersSchema.js";

const customersRouter = Router()

customersRouter.get('/customers', GetCustomers)
customersRouter.get('/customers/:id', GetOneCustomer)
customersRouter.post('/customers', ValidateSchema(customersValidation), PostCustomers)
customersRouter.put('/customers/:id', ValidateSchema(customersValidation), UpdateCustomer)

export default customersRouter;