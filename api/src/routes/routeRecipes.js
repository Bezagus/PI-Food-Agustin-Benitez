const express = require('express');
const RecipesService = require('../service/service.recipes.js');
const { ValidatorHandler } = require('../middlewares/validator.handler.js');
const { RecipeSchema, NameRecipeSchema, IdRecipesSchema,  IdRecipeDBSchema} = require('../schema/recipes.schema.js')

const router =  express.Router();
const recipes = new RecipesService()

router.get('/',async  (req, res, next)=>{
    try{
        const allRecipes = await recipes.getAllRecipes()

        res.status(200).json(allRecipes)
    }catch(error){
        next(error)
    }
});

router.get('/name/:name', 
    ValidatorHandler(NameRecipeSchema, 'params') ,
    async  (req, res, next)=>{
        try{
            const { name } = req.params

            const recipe = await recipes.getRecipesByName(name);
            res.status(200).json(recipe)

        }catch(error){
            next(error)
        }
    }
)
router.get('/id/:id',
    ValidatorHandler(IdRecipesSchema, 'params')
    ,async (req, res, next) =>{
        try{
            const { id } = req.params
            if(!isNaN(id)){
                const info = await recipes.getRecipeApiId(id);
                res.status(200).send(info)
            }else{
                const Db = await recipes.getRecipeDbId(id);
                res.status(200).send(Db)
            }
        }catch(error){
            next(error)
        }
    }
)

router.post('/', 
    ValidatorHandler(RecipeSchema, 'body') ,
    async (req, res, next) =>{
        try{
            const newRecipe = await recipes.createRecies(req.body);

            res.status(201).json({
                message: 'recipe created successfully',
                recipe: newRecipe
            })
        }catch(error){
            next(error)
        }
    }
);

router.delete('/:id', 
    ValidatorHandler(IdRecipeDBSchema, 'params'),
    async (req, res, next) =>{
        try{
            const {id} = req.params

            const deleteRecipe = await recipes.deleteRecipe(id)

            res.status(200).json({
                message: 'recipe successfully removed',
                status: deleteRecipe
            })
        }catch(error){
            next(error)
        }
})

module.exports = router;