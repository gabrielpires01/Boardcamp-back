import db from "../Database/Database.js";

const GetCategories = async(req,res) => {
	try {
		const categories = await db.query('SELECT * FROM categories');
		return res.send(categories.rows)
	}catch(err){
		return res.status(500).send(err)
	}
};

const PostCategories = async(req,res) => {
	const { name } = req.body;

	try {
		const categories = await db.query('SELECT * FROM categories WHERE name=$1',[name]);
		if (categories.rows) {
			return res.sendStatus(409)
		}
		await db.query(`INSERT INTO categories (name) 
						VALUES ($1)`,[name])
		return res.sendStatus(201)
	} catch(err) {
		return res.status(500).send(err)
	}
}

export {GetCategories, PostCategories}