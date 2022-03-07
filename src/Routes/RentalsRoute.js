import { Router } from "express";
import { DeleteRentals, GetRentals, PostRentals, ReturnRentals } from "../Controllers/RentalsController.js";

const rentalsRoute = Router();

rentalsRoute.get('/rentals', GetRentals);
rentalsRoute.post('/rentals', PostRentals);
rentalsRoute.post('/rentals/:id/return', ReturnRentals)
rentalsRoute.delete('/rentals/:id', DeleteRentals)

export default rentalsRoute