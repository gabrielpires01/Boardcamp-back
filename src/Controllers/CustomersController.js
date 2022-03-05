import db from "../Database/Database.js";

const GetCustomers = async(req,res) => {
	let expression = '';
	if (req.query.cpf) {
		expression = 'WHERE cpf iLIKE ' + `'${req.query.cpf}%'`
	}

	try {
		const clients = await db.query(`SELECT * FROM customers ${expression}`);

		return res.send(clients.rows)
	} catch(err) {
		return res.status(500).send(err)
	}
};

export { GetCustomers };