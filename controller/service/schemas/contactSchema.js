const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact']
        },
        email: {
			type: String,
			required: [true, "Set email for contact"],
		},
		phone: {
			type: String,
			match: /^\d{3}-\d{3}-\d{2}-\d{2}$/,
			required: [true, "Set phone for contact"],
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true
		}
    },
    { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({ "any.required": "missing required name field" }),
    email: Joi.string()
        .required()
        .messages({ "any.required": "missing required email field" }),
    phone: Joi.string()
        .required()
        .messages({ "any.required": "missing required phone field" }),
    favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
    favorite: Joi.bool().required(),
});

contactSchema.post("save", (error, data, next) => {
	error.status = 400;
	next();
});

const Contact = model('contact', contactSchema);

module.exports = {
	Contact,
	joiSchema,
	favoriteJoiSchema
};