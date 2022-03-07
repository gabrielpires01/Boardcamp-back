import { Router } from "express";
import { GetRentals } from "../Controllers/RentalsController.js";

const rentalsRoute = Router();

rentalsRoute.get('/rentals', GetRentals);

export default rentalsRoute