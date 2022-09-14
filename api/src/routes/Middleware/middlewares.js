const {
    YOUR_API_KEY
} = process.env;
const axios = require('axios');
const e = require('express');
const {Recipe, Diet} = require('../../db.js')


const getAllApi = async () =>{
    try{
        const infoAllApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`);
        return (infoAllApi.data)
    }catch(error){
        return(error)
    }
}
const getApi = async () =>{
    try{
        const infoApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`);
        const dataApi = infoApi.data;
        const results = dataApi.results;
        
        const apiMap =  results.map(el =>{
            let step = el.analyzedInstructions.map(a=>{
                return a.steps.map(as=>{
                    return(`Paso ${as.number}: ${as.step}.`)
                })
            });
            return({
                id: el.id,
                name: el.title.toLowerCase(),
                summary: el.summary,
                healthScore: el.healthScore,
                steps: step[0],
                img: el.image,
            })
        })
        
        return (apiMap)
        
    }catch(error){
        return(error)
    }
};

const getDiets = async () =>{
    const arrDiets = []
    try{
        const infoDiets = await getAllApi();
        const allDiets = infoDiets.results.map(el =>{
            el.diets.forEach(di => {
                arrDiets.push(di)
            });
        })
        const notRepeat = new Set(arrDiets);
        const finalArr = [...notRepeat]
        return(finalArr)
    }catch(error){
        return (error)
    }
};

const getById = async (id) =>{
    try{
        const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`)
        const dataRecipe = recipe.data;
        const dataAll ={
            id:dataRecipe.id,
            name: dataRecipe.title,
            summary: dataRecipe.summary,
            healthScore: dataRecipe.healthScore,
            img: dataRecipe.image,
        }
        return(dataAll)
    }catch(error){
        return(error)
    }
}
const getByName = async (arg) =>{
    try{
        const allData = await getApi();
        const nameApi = allData.filter(el=> el.name.toLocaleLowerCase().includes(arg.toLocaleLowerCase()));
        return(nameApi)
    }catch(error){
        return(error)
    }
}

module.exports = {
    getAllApi,
    getApi,
    getDiets,
    getById,
    getByName,
}
  