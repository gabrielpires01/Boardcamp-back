import Joi from "joi"

const customersValidation = Joi.object({
	name: Joi.string().required(),
	cpf: Joi.string().pattern(/^[0-9]+$/).min(11).max(11).required(),
	phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(11).required(),
	birthday: Joi.date().less('now').required(),
});

export default customersValidation;