const express = require('express');
const {Recipe, Diet} = require('../../db.js');
const axios = require('axios');
const {getApi, getById, getByName} = require('../Middleware/middlewares');



const router =  express.Router();

router.get('/',async  (req, res)=>{
    const { name } = req.query;

    if(name){
        try{
            const info = await getByName(name);
            res.status(200).send(info)
        }catch(error){
            res.status(404).send(error)
        }
    }else{
        try{
            const info = await getApi();
            res.status(200).send(info)
        }catch(error){
            res.status(404).send(error)
        }
    }
});
router.get('/:id',async (req, res) =>{
    const { id } = req.params
        const info = await getById(id);
        res.status(200).send(info)
})

router.post('/', async (req, res) =>{
    const { name, summary, healthScore, steps, img, diet } = req.body;

    if(!name || !summary){
        res.status(404).send('Nombre y Resumen Obligatorio')
    }
    const allRecipe = await getApi();
    const isRecipe = allRecipe.find(e=> e.name=== name );
    if(!isRecipe){
        const recipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            img,
        });

        const typeDb = await Diet.findAll({
            where:{
                name: diet
            }
        });

        recipe.addDiet(typeDb);
        return res.status(200).send('Receta creada correctamente')
    }
    res.status(404).send('No se pudo Crear receta')
})

module.exports = router;