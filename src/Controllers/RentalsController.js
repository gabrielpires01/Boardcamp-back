import db from "../Database/Database.js";

const GetRentals = async(req,res) => {
	let customerId = '';
	let gameId = '';
	if (req.query.customerId) {
		customerId = 'WHERE customerId = ' + `${req.query.customerId}`
	} else if (req.query.gameId) {
		gameId = 'WHERE gameId = ' + `${req.query.gameId}`
	}


	try {
		const rentals = await db.query(`SELECT * FROM rentals ${customerId} ${gameId}`);

		const rentalList = await Promise.all(rentals.rows.map(async(rental) => {
			const customer = await db.query('SELECT * FROM customers WHERE id = $1', [rental.customerId])
			const game = await db.query('SELECT * FROM games WHERE id = $1', [rental.gameId])

			return {
				...rental,
				customer: {...customer},
				game: {...game}
			}
		}));

		return res.send(rentalList)

	}catch(err) {
		return res.status(500).send(err)
	}
};

export { GetRentals };