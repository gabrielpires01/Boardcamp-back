import { Router } from "express";
import { GetRentals, PostRentals } from "../Controllers/RentalsController.js";

const rentalsRoute = Router();

rentalsRoute.get('/rentals', GetRentals);
rentalsRoute.post('/rentals', PostRentals);

export default rentalsRoute