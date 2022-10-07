const {
    YOUR_API_KEY
} = process.env;
const axios = require('axios');
const e = require('express');
const {Recipe, Diet} = require('../../db.js')


const getAllApi = async () =>{
    try{
        const infoAllApi = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`
            );
        return (infoAllApi.data)
    }catch(error){
        return(Error(error))
    }
}
const getApi = async () =>{
    try{
        const infoApi = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`
            );
        const dataApi = infoApi.data;
        const results = dataApi.results;
        
        const recetas_db= await Recipe.findAll({
            include:[{
                model:Diet,
                attributes:["name"]
            }]
        });

        const apiMap =  results.map(el =>{
            let step = el.analyzedInstructions.map(a=>{
                return a.steps.map(as=>{
                    return(`Paso ${as.number}: ${as.step}.`)
                })
            });
            return({
                id: el.id,
                name: el.title.toLowerCase(),
                summary: el.summary.replace(/<[^>]+>/g, ""),
                healthScore: el.healthScore,
                steps: step[0],
                diets: el.diets.map(e=>{
                    return{
                        name: e
                    }
                }),
                img: el.image,
                createdInDb: false
            })
        })
        const conjunto = [...recetas_db, ...apiMap]
        const arrConj = conjunto.map(i=>{
            const arrDiets = i.diets.map(diet=>{
                return diet.name
            });
            
            return{
                id: i.id,
                name: i.name.toLowerCase(),
                summary: i.summary,
                healthScore: i.healthScore,
                steps: i.steps,
                diets: arrDiets,
                img: i.img,
                createdInDb: i.createdInDb
            }
        })
        return (arrConj)
        
    }catch(error){
        return(Error(error))
    }
};

const getDiets = async () =>{
    let diets=["dairy free","gluten free","lacto ovo vegetarian","vegan","pescatarian","paleolithic","primal","whole 30"];
    try {
        const diet_types= diets.map(async dieta=>{
            return await Diet.findOrCreate({
                where:{name:dieta},
                defaults:{
                    name:dieta
                }
            })
        });
    } catch (error) {
        return(Error(error))
    }
};

const getById = async (id) =>{
    try{
        const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`)
        const dataRecipe = recipe.data;
        const stepAll = dataRecipe.analyzedInstructions.map(a=>{
            return a.steps.map(as=>{
                return(`Step ${as.number}: ${as.step}.`)
            })
        });
        const dataAll ={
            id:dataRecipe.id,
            name: dataRecipe.title,
            summary: dataRecipe.summary.replace(/<[^>]+>/g, ""),
            healthScore: dataRecipe.healthScore,
            steps: stepAll[0],
            diets: dataRecipe.diets,
            img: dataRecipe.image,
        }
        return(dataAll)
    }catch(error){
        return(Error(error))
    }
}
const getByIdDb = async(arg)=>{
    try{
        let receta_db= await Recipe.findByPk(arg,{
            include:Diet
        });
        return ({
            id: receta_db.id,
            name: receta_db.name.toLowerCase(),
            summary: receta_db.summary,
            healthScore:receta_db.healthScore,
            steps: [receta_db.steps],
            img: receta_db.img,
            diets: receta_db.diets.map(el=>{
                return(el.name)
            })
        })
    }catch(error){
        return(Error(error))
    }
    
}
const getByName = async (arg) =>{
    try{
        const allData = await getApi();
        const nameApi = allData.filter(el=> el.name.toLocaleLowerCase().includes(arg.toLocaleLowerCase()));
        return(nameApi)
    }catch(error){
        return(Error(error))
    }
}

module.exports = {
    getAllApi,
    getApi,
    getDiets,
    getById,
    getByName,
    getByIdDb
}
  