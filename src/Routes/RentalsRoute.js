import { Router } from "express";
import { GetRentals, PostRentals, ReturnRentals } from "../Controllers/RentalsController.js";

const rentalsRoute = Router();

rentalsRoute.get('/rentals', GetRentals);
rentalsRoute.post('/rentals', PostRentals);
rentalsRoute.post('/rentals/:id/return', ReturnRentals)

export default rentalsRoute