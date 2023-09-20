const boom = require('@hapi/boom')
const { Diet } = require('../db')

class DietsService {

    async getDietsApi(){
        let diets=["dairy free","gluten free","lacto ovo vegetarian","vegan","pescatarian","paleolithic","primal","whole 30"];

        diets.map(async dieta=>{
            await Diet.findOrCreate({
                where:{name:dieta},
                defaults:{
                    name:dieta
                }
            })
        });
    }

    async find(){
        const diets= await Diet.findAll();

        if(diets.length === 0){
            throw boom.notFound('there are no diets')
        }

        return diets
    }
}

module.exports = DietsService;