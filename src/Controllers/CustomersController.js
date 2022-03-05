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

const GetOneCustomer = async(req,res) => {
	const { id } = req.params;

	try {
		const clients = await db.query(`SELECT * FROM customers WHERE id=$1`, [id]);
		if (!clients.rowCount) return res.sendStatus(404)

		return res.send(clients.rows[0])
	} catch(err) {
		return res.status(500).send(err)
	}
}

export { GetCustomers, GetOneCustomer };