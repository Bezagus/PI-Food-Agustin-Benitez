const boom = require('@hapi/boom');
const { Recipe, Diet } = require('../db');
const axios = require('axios');
const {
    YOUR_API_KEY
} = process.env;

class RecipesService {

    async getAllRecipesApi(){
        const getAllApi = await await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`);

        if(getAllApi){
            throw boom.notFound('there are no recipes')
        }
        return (getAllApi.data)
    }

    async getAllRecipes(){
        const getrecipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`);
        
        if(!getrecipesApi){
            throw boom.notFound('error get api')
        }

        const recipesApi = getrecipesApi.data.results;

        const getRecipesDb = await Recipe.findAll({
            include:[{
                model:Diet,
                attributes:["name"]
            }]
        })

        if(getRecipesDb.length){
            throw boom.notFound('there no recipes data base')
        }

        const refactoringRecipesApi = await recipesApi.map(element =>{
            const stepRecipe = element.analyzedInstructions.map( step =>{
                return step.steps.map(as=>{
                    return(`Step ${as.number}: ${as.step}.`)
                })
            });
            const recipeObject = {
                id: element.id,
                name: element.title,
                summary: element.summary.replace(/<[^>]+>/g, ""),
                healthScore: element.healthScore,
                steps: stepRecipe[0],
                diets: element.diets.map(diet =>{
                    return{
                        name: diet
                    }
                }),
                img: element.image,
                createInDb: false
            }

            return(recipeObject)
        })

        const allRecipes = [...getRecipesDb, ...refactoringRecipesApi];
        
        const refactoringRecipes = allRecipes.map(recipe => {
            const arrDiets = recipe.diets.map(diet => {
                return diet.name
            })

            const refactoringObject = {
                id: recipe.id,
                name: recipe.name,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                steps: recipe.steps,
                diets: arrDiets,
                img: recipe.img,
                createdInDb: recipe.createInDb
            }

            return refactoringObject;
        })

        return refactoringRecipes
        
    }

    async getRecipesByName(name, validator=false){
        const allRecipes = await this.getAllRecipes();
        const filterRecipe = allRecipes.filter(recipe => recipe.name === name);

        if(!filterRecipe || filterRecipe.length === 0 && !validator){
            throw boom.notFound('no recipe found with that name')
        }

        return(filterRecipe)
    }

    async getRecipeApiId(id){
        let recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`);
        recipeApi = recipeApi.data

        if(!recipeApi || recipeApi.length === 0){
            throw boom.notFound('no recipe found with that id')
        }

        const stepsAll = recipeApi.analyzedInstructions.map(element=>{
            return element.steps.map(step=>{
                return (`step ${step.number}: ${step.step}`)
            })
        });

        const refactoringRecipe = {
            id:recipeApi.id,
            name: recipeApi.title,
            summary: recipeApi.summary.replace(/<[^>]+>/g, ""),
            healthScore: recipeApi.healthScore,
            steps: stepsAll[0],
            diets: recipeApi.diets,
            img: recipeApi.image,
        }

        return refactoringRecipe
    }

    async getRecipeDbId(uuid){

        let recipeDb= await Recipe.findOne(uuid,{
            include:Diet
        });

        if(!recipeDb){
            throw boom.notFound('no recipe found with that id')
        }

        return ({
            id: recipeDb.id,
            name: recipeDb.name,
            summary: recipeDb.summary,
            healthScore:recipeDb.healthScore,
            steps: [recipeDb.steps],
            img: recipeDb.img,
            diets: recipeDb.diets.map(element=>{
                return(element.name)
            })
        })
    }

    async createRecies(newRecipe){
        const { name, summary, healthScore, steps, img, diet } = newRecipe;

        const validateName = await this.getRecipesByName(name, true);

        if(validateName.length > 0){
            throw boom.conflict('Name Recipe exist')
        }

        const recipe = await Recipe.create({
            name: name,
            summary,
            healthScore,
            steps,
            img,
        });

        if(diet){
            const dietsDb = await Diet.findAll({
                where:{
                    name: diet
                }
            });
            recipe.addDiet(dietsDb)
        }


        return (recipe)
    }

    async deleteRecipe(id){
        const validateRecipe = await Recipe.findOne({
            where:{
                id: id
            }
        })

        if(!validateRecipe){
            throw boom.notFound('no recipe found with that id')
        }

        await Recipe.destroy({
            where: {
                id: id
            }
        })

        return true
    }
}


module.exports = RecipesService