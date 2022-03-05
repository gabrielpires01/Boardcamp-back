import db from "../Database/Database.js"

const GetGames = async(req,res) => {

	let expression = '';
	if (req.query.name) {

		expression = 'WHERE name iLIKE ' + `'${req.query.name}%'`
	}

	try {
		const games = await db.query(`SELECT * FROM games ${expression}`);
		return res.send(games.rows)
	}catch(err) {
		return res.status(500).send(err)
	}
}

const PostGames = async(req,res) => {
	const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

	const newTotal = Number(stockTotal)
	const newPrice = Number(pricePerDay)

	if (newTotal <= 0 || newPrice <= 0) return res.sendStatus(400)

	try {
		const category = await db.query(`SELECT * FROM categories WHERE id = $1`,[categoryId]);
		
		if (!category.rows.length) return res.sendStatus(400)
		const game = await db.query(`SELECT * FROM games WHERE name = $1`,[name])
		
		if (game.rows.length) return res.sendStatus(409)

		await db.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
						VALUES ($1, $2, $3, $4, $5)`, 
						[name, image, newTotal, categoryId, newPrice]);

		return res.sendStatus(201)

	}catch(err) {
		return res.status(500).send(err)
	}
}

export { GetGames, PostGames }