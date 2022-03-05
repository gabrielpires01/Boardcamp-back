import db from "../Database/Database.js"

const GetGames = async(req,res) => {
	try {
		const games = await db.query(`SELECT * FROM games`);
		return res.send(games.rows)
	}catch(err) {
		return res.status(500).send(err)
	}
}

export { GetGames }