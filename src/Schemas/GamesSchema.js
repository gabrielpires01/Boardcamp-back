import Joi from 'joi';

const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;


const gamesValidation = Joi.object({
	name: Joi.string().required(),
	image: Joi.string().pattern(expression).required(),
	stockTotal: Joi.string().required(),
	categoryId: Joi.number().integer().required(),
	pricePerDay: Joi.string().required()
})

export default gamesValidation;