import Joi from "joi";

const categoryValidation = Joi.object({
	name: Joi.string().required(),
})

export default categoryValidation;