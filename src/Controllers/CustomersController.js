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

const PostCustomers = async(req,res) => {
	const { name, phone, cpf, birthday } = req.body;

	try {
		const customer = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf])
		if (customer.rowCount) return res.sendStatus(409)

		await db.query(`INSERT INTO customers (name, phone, cpf, birthday)
						VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])
		return res.sendStatus(201)
	}catch(err) {
		return res.status(500).send(err)
	}
}

const UpdateCustomer = async(req,res) => {
	const { id } = req.params;

	const { name, phone, cpf, birthday } = req.body;

	try {
		const customer = await db.query(`SELECT * FROM customers WHERE cpf=$1 AND NOT id=$2`, [cpf, id])
		if (customer.rowCount) return res.sendStatus(409)

		await db.query(`UPDATE customers 
							SET name=$1, phone=$2, cpf=$3, birthday=$4
						WHERE id=$5`, [name, phone, cpf, birthday, id])
		
		return res.sendStatus(200)
	}catch(err) {
		return res.status(500).send(err)
	}
}

export { GetCustomers, GetOneCustomer, PostCustomers, UpdateCustomer };