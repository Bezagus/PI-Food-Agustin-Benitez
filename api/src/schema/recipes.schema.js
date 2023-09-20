const Joi = require('joi')

const idDb = Joi.string().uuid()
const name = Joi.string().min(3)
const summary = Joi.string().min(1);
const healthScore = Joi.string().min(1);
const img = Joi.string().uri();
const steps = Joi.array();

const RecipeSchema = Joi.object({
    name: name.required(),
    summary: summary.required(),
    healthScore: healthScore,
    steps: steps,
    img: img
})

const NameRecipeSchema = Joi.object({
    name: name.required()
})

const IdRecipesSchema = Joi.object({
    id: Joi.string().required()
})

const IdRecipeDBSchema = Joi.object({
    id: idDb.required()
})

module.exports = {
    RecipeSchema,
    NameRecipeSchema,
    IdRecipesSchema,
    IdRecipeDBSchema,
}
