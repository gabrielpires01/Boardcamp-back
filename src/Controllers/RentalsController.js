import db from "../Database/Database.js";

const GetRentals = async(req,res) => {
	let customerId = '';
	let gameId = '';
	if (req.query.customerId) {
		customerId = 'WHERE "customerId" = ' + `${req.query.customerId}`
	} else if (req.query.gameId) {
		gameId = 'WHERE "gameId" = ' + `${req.query.gameId}`
	}


	try {
		const rentals = await db.query(`SELECT * FROM rentals ${customerId} ${gameId}`);

		const rentalList = await Promise.all(rentals.rows.map(async(rental) => {
			const customer = await db.query('SELECT * FROM customers WHERE id = $1', [rental.customerId]);
			const game = await db.query('SELECT * FROM games WHERE id = $1', [rental.gameId]);
			const category = await db.query('SELECT * FROM categories WHERE id = $1', [game.rows[0].categoryId]);
			 
			return {
				...rental,
				customer: {
					id: customer.rows[0].id,
					name: customer.rows[0].name
				},
				game: {
					id: game.rows[0].id,
					name: game.rows[0].name,
					categoryId: game.rows[0].categoryId,
					categoryName: category.rows[0].name
				}
			}
		}));

		
		return res.send(rentalList)

	}catch(err) {
		return res.status(500).send(err)
	}
};

const PostRentals = async(req,res) => {
	const { customerId, gameId, daysRented } = req.body;

	let rentDate = new Date();
	rentDate = rentDate.toLocaleDateString("en-GB").split('T')[0];

	
	if (daysRented < 1) return res.sendStatus(400)

	try {
		const customer = await db.query('SELECT * FROM customers WHERE id = $1', [customerId])
		if (!customer.rowCount) return res.sendStatus(400)

		const game = await db.query('SELECT * FROM games WHERE id = $1', [gameId])
		if (!game.rowCount) return res.sendStatus(400)

		const originalPrice = Number(daysRented)*Number(game.rows[0].pricePerDay);

		const rentals = await db.query(`SELECT * FROM rentals 
										WHERE "gameId" = $1 AND "returnDate" IS NULL`, [game.rows[0].id,])

		if(rentals.rowCount >= Number(game.rows[0].stockTotal) ) {
			return res.sendStatus(400)
		}

		await db.query(`INSERT INTO rentals 
							("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
						VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
						[customerId, gameId, rentDate, daysRented, null, originalPrice, null]);

		return res.sendStatus(201)

	}catch(err) {
		return res.status(500).send(err)
	}
}

export { GetRentals, PostRentals };