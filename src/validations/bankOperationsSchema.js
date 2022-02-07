import joi from "joi"

const bankOperationsSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required()
});

export {
    bankOperationsSchema
};

