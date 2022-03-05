const ValidateSchema = schema => {
	return (req,res,next) => {
		const validate = schema.validate(req.body)
		if(validate.error) {
			return res.status(422).send(validate.error)
		}

		next()
	}
}

export default ValidateSchema;